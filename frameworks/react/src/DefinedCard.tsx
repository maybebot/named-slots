import { defineSlots, type Slottable } from "named-slots";

export const DefinedCard = ({ children }: { children: Slottable }) => {
  const { Slot, hasSlot } = defineSlots(children, [
    "header",
    "content",
    "footer",
  ] as const);

  const hasContent = hasSlot("content");
  console.log("DefinedCard has content?", hasContent);

  return (
    <div className={"card"}>
      <Slot name="header"></Slot>
      {/* no fallback, renders only if slot is provided */}
      <Slot name="content">
        <div>Fallback contdddent</div>
      </Slot>
      <div className={"class-from-inside"}>
        <Slot name="footer">
          <div style={{ background: "pink" }}>Fallback footer</div>
        </Slot>
      </div>
    </div>
  );
};
