import type { ComponentChildren, VNode } from "preact";

/** Multiple children. For one child, use the regular {children} */
export type Slottable<T = string> = VNode<{ "data-slot": T }>[];

interface Slot {
  name: string;
  children?: ComponentChildren;
  from: Slottable;
}

export const Slot = ({ name, children: fallback, from }: Slot) => {
  return from.find((el) => el.props?.["data-slot"] === name) ?? fallback;
};

const namedlog = (message: string) => {
  console.error("%c [named-slots]", "color: #56b9c8", message);
};

/**
 * Check if slots are valid. Detects undefined, duplicates and invalid data-slot names.
 * @returns {void}
 */
export const validateSlots = <T extends unknown = string>(
  children: Slottable<T>,
  slotNames: T[],
  { throws, inComponent }: { throws?: boolean; inComponent: Function }
) => {
  if (process.env.NODE_ENV !== "development") return;

  const usedSlots: T[] = [];

  const definedIn = inComponent ? `, defined in '${inComponent.name}',` : "";

  const throwOrLog = (message: string) => {
    if (throws) {
      throw new Error(message);
    } else {
      namedlog(message);
    }
  };

  children.forEach((child) => {
    const slotName = child.props?.["data-slot"];
    if (!slotName) {
      throwOrLog(
        `A slottable component${definedIn} has been passed children without a data-slot attribute.
Valid data-slot names are: ${slotNames.join(", ")}`
      );
    }
    if (!slotNames.includes(slotName)) {
      throwOrLog(`Slot '${slotName}'${definedIn} is not valid.
Valid data-slot names are: ${slotNames.join(", ")}`);
    }
    if (usedSlots.includes(slotName)) {
      throwOrLog(`Slot '${slotName}'${definedIn} has been used more than once.
Each named-slot can be defined and used only once.`);
    }
    usedSlots.push(child.props?.["data-slot"]);
  });
};
