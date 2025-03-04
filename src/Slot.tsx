import type { ComponentChildren, VNode } from "preact";

/** Multiple children. For one child, use the regular {children} */
export type Slottable<T = string> = VNode<{ slot?: T } & { slot: any }>[];

interface Slot {
  name: string;
  children?: ComponentChildren; // fallback
  from: Slottable; // all slots
  usedIn?: (props: any) => any;
}

// TODO: this is pretty bad and hacky
const findWrongSlots = (usedIn: (props: any) => any, from: Slottable) => {
  const slotNames = (usedIn.toString().match(/name: "([^"]+)"/g) ?? [])
    .map((el) => el.replace('name: "', ""))
    .map((el) => el.replace('"', ""));

  const providedSlotNames = from.map((el) => el.props?.slot);
  providedSlotNames.map((n) => {
    if (!slotNames.includes(n)) {
      console.warn(
        `Slot '${n}' was passed to ${usedIn.name}, which does not declare it.`
      );
    }
  });
};

export const Slot = ({ name, children: fallback, from, usedIn }: Slot) => {
  if (process.env.NODE_ENV === "development") {
    usedIn && findWrongSlots(usedIn, from);
  }
  return from.find((el) => el.props?.slot === name) ?? fallback;
};
