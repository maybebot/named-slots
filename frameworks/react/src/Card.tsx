import { Slot, validateSlots, type Slottable } from "named-slots";

export const Card = ({ children }: { children: Slottable }) => {
  validateSlots(children, ["header", "content", "footer"], {
    inComponent: Card,
  });

  return (
    <div className={"card"}>
      <Slot name="header" from={children}></Slot>
      {/* no fallback, renders only if slot is provided */}
      <Slot name="content" from={children}>
        <div>Fallback content</div>
      </Slot>
      <div className={"class-from-inside"}>
        <Slot name="footer" from={children}>
          <div style={{ background: "pink" }}>Fallback footer</div>
        </Slot>
      </div>
    </div>
  );
};
