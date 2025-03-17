import { Card } from "./Card";
import { DefinedCard } from "./DefinedCard";
import { FlexingCard } from "./FlexingCard";
import { RandomComponent } from "./RandomComponent";

export function App() {
  return (
    <>
      <Card>
        <div slot="header" className={"class-from-outside"}>
          This div is not semantic
        </div>
        <RandomComponent slot="content" />
        <footer slot="footer">I'm a footer</footer>
      </Card>
      <DefinedCard>
        <div slot="header" className={"class-from-outside"}>
          This div is not semantic
        </div>
        <RandomComponent slot="content" />
        <footer slot="footer">I'm a footer</footer>
      </DefinedCard>
      <FlexingCard>
        <div slot="header" className={"class-from-outside"}>
          Flexing
        </div>
        <RandomComponent slot="content" />
        <template slot="footer">
          <div>Uno</div>
          <div>Due</div>
          <div>Tre</div>
        </template>
      </FlexingCard>
    </>
  );
}
