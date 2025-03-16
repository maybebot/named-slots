import { defineSlots, type Slottable } from "named-slots";

export const DefinedCard = ({ children }: { children: Slottable }) => {
  const Slot = defineSlots<"header" | "content" | "footer">(children, [
    "header",
    "content",
    "footer",
  ]);

  return (
    <div className={"card"}>
      <Slot name="header"></Slot>
      {/* no fallback, renders only if slot is provided */}
      <Slot name="content">
        <div>Fallback content</div>
      </Slot>
      <div className={"class-from-inside"}>
        <Slot name="footer">
          <div style={{ background: "pink" }}>Fallback footer</div>
        </Slot>
      </div>
    </div>
  );
};
