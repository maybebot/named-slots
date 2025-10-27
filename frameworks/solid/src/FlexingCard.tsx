import { Slottable, defineSlots } from "../../../src/solid/Slot";

export const FlexingCard = ({ children }: { children: Slottable }) => {
  const { Slot } = defineSlots(children, ["header", "content", "footer"]);

  return (
    <div class={"card"}>
      <Slot name="header"></Slot>
      {/* no fallback, renders only if slot is provided */}
      <Slot name="content">
        <div>Fallback content</div>
      </Slot>
      <div style={{ display: "flex", "justify-content": "space-between" }}>
        {/* flex, to horizontaly display many children (with <template>) */}
        <Slot name="footer">
          <div style={{ background: "pink" }}>Fallback footer</div>
        </Slot>
      </div>
    </div>
  );
};
