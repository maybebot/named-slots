# named-slots 🦥

Slots for preact, react and solid in under 0.2Kb, unzipped, unminified

```sh
npm i named-slots
```

Use declarative "holes" in your components with `<Slot name="header">` instead of an imperative prop based approach.
Inspired by slots in Vue/Svelte/Angular/WebComponents.

Fill them with any Component or HTML element in the slot with the `slot` attribute: `<div slot="header">`.

See example below.

## Usage

Declaring slots in component where they render, eg a Card component

| `Slot` props       |                                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `name`             | name of the slot                                                                                                                  |
| `from`             | always the `children` of where the `Slot` is defined, to give the Slot control over it                                            |
| `children`/content | Fallback content for when nothing has been slotted in. If nothing is slotted, and no fallback is given, it will not render at all |

```jsx
// Card.tsx
import { Slot, Slottable } from "named-slots";

export const Card = ({ children }: { children: Slottable }) => {
  // optionally validate slots during development, see below
  return (
    <div className={"card"}>
      {/* header has no fallback, renders only if slot is provided */}
      <Slot name="header" from={children} />
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
  <div slot="header" className={"class-from-outside"}>
    This div is not semantic
  </div>
  <JsxComponent slot="content" />
  <footer slot="footer">I'm a footer</footer>
</Card>;
```

This will render the following html:

```html
<div class="card">
  <div slot="header" class="class-from-outside">This div is not semantic</div>
  <section class="preact">Some content</section>
  <div class="class-from-inside">
    <footer slot="footer">I'm a footer</footer>
  </div>
</div>
```

## Solid.js

Since solid does not use a VDOM the usage changes a tiny bit, with a dedicated import.

```ts
import { Slot } from "named-slots/solid";
```

In addition every element with `slot` needs to be an HTML element, not a Solid component (or wrapped in one). In the example above, `<JsxComponent slot="content" />` would not work. `<div ="content"><JsxComponent slot="content" /></div>`.

## Validation and debugging. Almost type-safety.

Adding types or autocompletion to validate the slot name has been a miserable failure so far.

Runtime validation can be achived using `validateSlots`.
This will be stripped away automatically in production (based on `process.env.NODE_ENV`) to not impact bundle size.

```js
import { Slot, validateSlots, type Slottable } from "named-slots";

export const Card = ({ children }: { children: Slottable }) => {
  validateSlots(children, ["header", "content", "footer"], {
    inComponent: Card,
  });
  return (...)
};
```

---

Made with 🍕 in Amsterdam.
