import type { ComponentChildren, VNode } from "preact";

/** Multiple children. For one child, use the regular {children} */
export type Slottable = VNode<{ slot?: string }>[];

interface Slot {
  name: string;
  children?: ComponentChildren;
  from: Slottable;
}

export const Slot = ({ name, children: fallback, from }: Slot) => {
  return from.find((el) => el.props?.slot === name) ?? fallback;
};

declare module "preact" {
  namespace JSX {
    interface IntrinsicAttributes {
      key?: any;
      slot?: string;
    }
  }
}
