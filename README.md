# named-slots

Slots for preact in under 200 bytes, unzipped

```sh
npm i named-slots
```

Declare "holes" in your components with `<Slot name="header">`.

Fill them with any Component or html element in the slot with the `data-slot` attribute: `<div data-slot="header">`.

See example below.

## Usage

Declaring slots in component where they render, eg a Card component

```jsx
// Card.tsx
import { ComponentChildren } from "preact";
import { Slot } from "named-slots";

export const Card = ({ children }: { children: ComponentChildren }) => {
  return (
    <div className={"card"}>
      <Slot name="header" from={children}></Slot> {/* no fallback, renders only if slot is provided */}
      <Slot name="content" from={children}>
        Fallback content
      </Slot>
      <div className={"class-from-inside"}>
        <Slot name="footer" from={children}>
          Fallback footer
        </Slot>
      </div>
    </div>
  );
};
```

Then get consumed like this:

```jsx
// Page.tsx
import { Slot } from "named-slots";

<Card>
  <div data-slot="header" className={"class-from-outside"}>
    This div is not semantic
  </div>
  <JsxComponent data-slot="content" />
  <footer data-slot="footer">I'm a footer</footer>
</Card>;
```

This will render the following html:

```html
<div class="card">
  <div data-slot="header" class="class-from-outside">
    This div is not semantic
  </div>
  <section class="preact">Some content</section>
  <div class="class-from-inside">
    <footer data-slot="footer">I'm a footer</footer>
  </div>
</div>
```

Validation and debugging. Almost type-safety.

```js
import { Slot, validateSlots, type Slottable } from "named-slots";
```

---

Made with 🍕 in Amsterdam.
