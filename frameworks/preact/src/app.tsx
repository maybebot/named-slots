import { Card } from "./Card";
import { RandomComponent } from "./RandomComponent";

export function App() {
  return (
    <Card>
      <div data-slot="header" className={"class-from-outside"}>
        This div is not semantic
      </div>
      <RandomComponent data-slot="content" />
      <footer data-slot="footer">I'm a footer</footer>
    </Card>
  );
}
