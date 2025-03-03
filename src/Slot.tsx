import type { ComponentChildren } from "preact";

interface Slot {
  name: string;
  children?: ComponentChildren;
  from: ComponentChildren;
}

export const Slot = ({ name, children: fallback, from }: Slot) => {
  if (Array.isArray(from)) {
    const foundSlot = from.find((el) => el.props?.slot === name);
    if (foundSlot) return foundSlot;
  }

  // @ts-expect-error might not be a html/jsx element, and that's ok
  if (from?.props?.slot === name) {
    return from;
  }

  return fallback;
};

declare module "preact" {
  namespace JSX {
    interface IntrinsicAttributes {
      key?: any;
      slot?: string;
    }
  }
}
