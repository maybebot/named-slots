import { Card } from "./Card";
import { DefinedCard } from "./DefinedCard";
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
    </>
  );
}
