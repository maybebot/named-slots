import { Card } from "./Card";
import { RandomComponent } from "./RandomComponent";

function App() {
  return (
    <Card>
      <div data-slot="header" class={"class-from-outside"}>
        This div is not semantic
      </div>
      <div data-slot="content">
        {/*has to be wrapped in an html element, otherwise it will result in a function */}
        <RandomComponent />
      </div>
      <footer data-slot="footer">I'm a footer</footer>
    </Card>
  );
}

export default App;
