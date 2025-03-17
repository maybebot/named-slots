import { Card } from "./Card";
import { DefinedCard } from "./DefinedCard";
import { FlexingCard } from "./FlexingCard";
import { RandomComponent } from "./RandomComponent";

function App() {
  return (
    <>
      <Card>
        <div slot="header" class={"class-from-outside"}>
          This div is not semantic
        </div>
        <div slot="content">
          {/*has to be wrapped in an html element, otherwise it will result in a function */}
          <RandomComponent />
        </div>
        <footer slot="footer">I'm a footer</footer>
      </Card>
      <DefinedCard>
        <div slot="header" class={"class-from-outside"}>
          This div is not semantic
        </div>
        <div slot="content">
          {/*has to be wrapped in an html element, otherwise it will result in a function */}
          <RandomComponent />
        </div>
        <footer slot="footer">I'm a footer</footer>
      </DefinedCard>
      <FlexingCard>
        <div slot="header" class={"class-from-outside"}>
          Flexing
        </div>
        <div slot="content">
          {/*has to be wrapped in an html element, otherwise it will result in a function */}
          <RandomComponent />
        </div>
        <template slot="footer">
          <div>Uno</div>
          <div>Due</div>
          <div>Tre</div>
        </template>
      </FlexingCard>
    </>
  );
}

export default App;
