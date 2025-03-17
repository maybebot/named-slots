export type Slottable = any[]; // TODO: narrow for solid

interface Slot<T = string> {
  name: T;
  children?: any;
  from: any[];
}

const getSlot = <T extends unknown = string>({
  name,
  children: fallback,
  from,
}: Slot<T>) => {
  const slot = from.find((el) => el.getAttribute("slot") === name);
  if (slot?.tagName === "TEMPLATE") {
    return slot.content;
  }
  return slot ?? fallback;
};

/**
 * Named slot component. Renders the first child with a matching slot attribute.
 * @param {string} name - The name of the slot to render.
 * @param {any} children - The fallback content to render if no matching slot is found.
 * @param {Slottable} from - The children to search for the slot.
 * @returns {any} The matching slot or the fallback content.
 */
export const Slot = <T extends unknown = string>({
  name,
  children: fallback,
  from,
}: Slot<T>) => getSlot<T>({ name, children: fallback, from });

/**
 * Check at runtime if slots are valid. Detects undefined, duplicates and invalid slot names.
 * Stripped away in production.
 * @param {Slottable} children - The children of the component.
 * @param {string[]} slotNames - The valid slot names.
 * @param {object} options - Additional options for better debugging.
 * @param {boolean} options.throws - If true, throws an error instead of logging it.
 * @param {Function} options.inComponent - The component where the slots are defined.
 * @returns {void}
 */
export const validateSlots = <T extends unknown = string>(
  children: Slottable,
  slotNames: T[],
  { throws, inComponent }: { throws?: boolean; inComponent?: Function }
) => {
  if (process.env.NODE_ENV !== "development") return;

  const usedSlots: any[] = [];

  const definedIn = inComponent ? `, defined in '${inComponent.name}',` : "";
  const validSlots = `Valid slot names are: ${slotNames.join(", ")} \n`;

  const throwOrLog = (message: string) => {
    if (throws) {
      throw new Error(message);
    } else {
      console.error("%c [named-slots]", "color: #56b9c8", message);
    }
  };

  children.forEach((child) => {
    const slotName = child.getAttribute("slot");
    if (!slotName) {
      throwOrLog(
        `A Slot${definedIn} received children missing a slot attribute.${validSlots}`
      );
    }
    if (!slotNames.includes(slotName)) {
      throwOrLog(`Slot '${slotName}'${definedIn} is not valid. ${validSlots}`);
    }
    if (usedSlots.includes(slotName)) {
      throwOrLog(`Slot '${slotName}'${definedIn} has been used more than once.
Each named-slot can be defined and used only once.`);
    }
    usedSlots.push(slotName);
  });
};

type DefinedSlot<T = string> = Omit<Slot<T>, "from">;

/**
 * Defines named slots for a component.
 * @param children children of component where Slot is used
 * @param slotNames names of Slots used in the component
 * @param options additional options for better debugging
 * @returns {Slot} Slot component
 */
export const defineSlots = <T extends unknown = string>(
  children: Slottable,
  slotNames: T[],
  options?: { inComponent?: Function; throws?: boolean }
) => {
  validateSlots(children, slotNames, options ?? {});
  // closure over children
  return ({ name, children: fallback }: DefinedSlot<T>) =>
    getSlot<T>({ name, children: fallback, from: children });
};
