export type Slottable = { props: any }[] | { props: any }; // relaxed for compatibility between preact/react

interface Slot<T = string> {
  name: T;
  children?: any;
  from: Slottable;
}

const getSlot = <T extends unknown = string>({
  name,
  children: fallback,
  from,
}: Slot<T>) => {
  const slotted = Array.isArray(from) ? from : [from];
  const slot = slotted.find((el) => el.props?.slot === name);
  // @ts-ignore-error type not declared in Slottable, present on HTML elements
  if (slot?.type === "template") {
    return slot.props.children;
  }
  return slot ?? fallback;
};

const slotExists = <T extends unknown = string>(name: T, from: Slottable) => {
  const slotted = Array.isArray(from) ? from : [from];
  return slotted.some((el) => el.props?.slot === name);
};

/**
 * Named slot component. Renders the first child with a matching slot attribute.
 * @param {string} name - The name of the slot to render.
 * @param {any} children - The fallback content to render if no matching slot is found.
 * @param {Slottable} from - The children to search for the slot.
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
 * @deprecated use `defineSlots`, export will be removed in 0.4.x
 * @returns {void}
 */
export const validateSlots = <T extends unknown = string>(
  children: Slottable,
  slotNames: T[],
  { throws, inComponent }: { throws?: boolean; inComponent?: Function }
) => {
  if (process.env.NODE_ENV !== "development") return;

  const usedSlots: T[] = [];
  const slotted = Array.isArray(children) ? children : [children];

  const definedIn = inComponent ? `, defined in '${inComponent.name}',` : "";
  const validSlots = `Valid slot names are: ${slotNames.join(", ")} \n`;

  const throwOrLog = (message: string) => {
    if (throws) {
      throw new Error(message);
    } else {
      console.error("%c [named-slots]", "color: #56b9c8", message);
    }
  };

  slotted.forEach((child) => {
    const slotName = child.props?.slot;
    if (!slotName) {
      throwOrLog(
        `A Slot${definedIn} received children missing a slot attribute.${validSlots}`
      );
    } else if (!slotNames.includes(slotName)) {
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
 */
export const defineSlots = <T extends unknown = string>(
  children: Slottable,
  slotNames: T[],
  options?: { inComponent?: Function; throws?: boolean }
) => {
  validateSlots(children, slotNames, options ?? {});
  // closure over children
  const Slot = ({ name, children: fallback }: DefinedSlot<T>) =>
    getSlot<T>({ name, children: fallback, from: children });

  const hasSlot = (name: T) => slotExists<T>(name, children);

  return { Slot, hasSlot };
};

// @ts-ignore-error preact not present
declare module "preact" {
  namespace JSX {
    interface IntrinsicAttributes {
      slot?: string;
    }
  }
}

// @ts-ignore-error react not present
declare module "react" {
  namespace JSX {
    interface IntrinsicAttributes {
      slot?: string;
    }
  }
}
