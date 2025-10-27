import { Slot, type Slottable } from "named-slots/solid";

export const Card = ({ children }: { children: Slottable }) => {
  return (
    <div class={"card"}>
      <Slot name="header" from={children}></Slot>
      {/* no fallback, renders only if slot is provided */}
      <Slot name="content" from={children}>
        <div>Fallback content</div>
      </Slot>
      <div class={"class-from-inside"}>
        <Slot name="footer" from={children}>
          <div style={{ background: "pink" }}>Fallback footer</div>
        </Slot>
      </div>
    </div>
  );
};
