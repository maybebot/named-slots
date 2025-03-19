## named-slots 🦥

Slots for preact, react and solid in under 0.2Kb, unzipped, unminified

<img align="right" width="50" height="50" src="https://github.com/maybebot/named-slots/blob/main/frameworks/solid/solid.svg">
<img align="right" width="50" height="50" src="https://github.com/maybebot/named-slots/blob/main/frameworks/react/react.svg">
<img align="right" width="50" height="50" src="https://github.com/maybebot/named-slots/blob/main/frameworks/preact/preact.svg">

```sh
npm i named-slots
```

Use declarative "holes" in your components with `<Slot name="header">` instead of an imperative prop based approach.
Inspired by slots in Vue/Svelte/Angular/WebComponents.

Fill them with any Component or HTML element in the slot with the `slot` attribute: `<div slot="header">`. Use the `<template slot="header">` element to render only the contents of it, typically text or multiple elements.

See example below.

## Defining a Slot

| `Slot` props       |                                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `name`             | name of the slot                                                                                                                  |
| `from`             | always the `children` of where the `Slot` is defined, to give the Slot control over it                                            |
| `children`/content | Fallback content for when nothing has been slotted in. If nothing is slotted, and no fallback is given, it will not render at all |

Define Slots in the component where you want them them to render, for example a Card component, where you want a header, content and a footer.

```jsx
// Card.tsx
import { Slot, Slottable } from "named-slots";

export const Card = ({ children }: { children: Slottable }) => {
  // optionally validate slots during development, see defineSlots below
  return (
    <section>
      {/* header has no fallback, renders only if slot is provided */}
      <Slot name="header" from={children} />
      <Slot name="content" from={children}>
        Fallback content
      </Slot>
      <div className="slots-go-anywhere">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Slot name="footer" from={children}>
            Fallback footer
          </Slot>
        </div>
      </div>
    </section>
  );
};
```

## Consuming components with Slots

Now that the card accepts slots, you can insert them inside a `<Card>` with an slot attribute. Using the slot attribute on a `<template>` element will render only the contents of the template.

```jsx
// Page.tsx
import { Slot } from "named-slots";

<Card>
  <div slot="header">This div is not semantic</div>
  <RandomComponent slot="content" />
  <template slot="footer">
    <div>One</div>
    <div>Two</div>
  </template>
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

Since solid does not use a VDOM it has a dedicated import.

```ts
import { Slot } from "named-slots/solid";
```

In addition every element with `slot` needs to be an HTML element, not a Solid component (or wrapped in one like the `<template>`). In the example above, `<RandomComponent slot="content" />` would not work. `<div ="content"><RandomComponent slot="content" /></div>` would.

## Type safety and validation

To type and validate slots it is recommended to use `defineSlots`, which returns a type-aware Slot component and provides runtime validation for slot usage, duplication and absence. Using `defineSlots` there is no need to specify `from={children}` on the Slots.

This is the recommended approach. The API is not the prettiest, requiring a Generic of the type and the values as well, but it provides extra security.

A third, optional, parameter can be passed to `defineSlots`, to improve debugging or to throw instead of console.logging. (example: `{ inComponent: Card, throws: true }`).

This will be stripped away in production to not add to the bundle (with a check on `process.env.NODE_ENV === "development"`).

```js
import { defineSlots, type Slottable } from "named-slots";

export const Card = ({ children }: { children: Slottable }) => {
  type CardSlots = "header" | "content" | "footer";
  const Slot =
    defineSlots <
    CardSlots >
    (children,
    ["header", "content", "footer"],
    { inComponent: Card, throws: true });
  return (
    <div>
      <Slot name="header"></Slot>
      <Slot name="content">
        <div>Fallback content</div>
      </Slot>
      <div>
        <Slot name="footer">
          <div>Fallback footer</div>
        </Slot>
      </div>
    </div>
  );
};
```

Adding proper types and autocompletion for slot names during usage (not definition) has been a miserable failure so far, which is why runtime validation has been added.

## Lock-in, or the absence thereof

This library does not want to lock you in. If you decide to adopt it and later on move away from it, my feeling will be hurt, but yours won't. Moving away is pretty straightforward.

The example below:

```jsx
// Page.tsx
<Card>
  <div slot="header" className={"class-from-outside"}>
    This div is not semantic
  </div>
  <RandomComponent slot="content" />
  <footer slot="footer">I'm a footer</footer>
</Card>;

// Card.tsx
import { Slot, Slottable } from "named-slots";

export const Card = ({ children }: { children: Slottable }) => {
  return (
    <section>
      <Slot name="header" from={children} />
      <Slot name="content" from={children}>
        Fallback content
      </Slot>
      <div className="slots-go-anywhere">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Slot name="footer" from={children}>
            Fallback footer
          </Slot>
        </div>
      </div>
    </section>
  );
};
```

Can be easily converted to this, by switching slots with props, and fallbacks with conditionals:

```jsx
// Page.tsx
<Card
  header={<div className={"class-from-outside"}>This div is not semantic</div>}
  footer={<footer slot="footer">I'm a footer</footer>}
>
  <RandomComponent slot="content" />
</Card>;
// Card.tsx
export const Card = ({
  children,
  header,
  footer,
}: {
  children: ComponentChildren,
  header: ComponentChildren,
  footer: ComponentChildren,
}) => {
  return (
    <div className={"card"}>
      {header}
      {!!children || <div>Fallback content</div>}
      <div className={"class-from-inside"}>
        {!!footer || <div style={{ background: "pink" }}>Fallback footer</div>}
      </div>
    </div>
  );
};
```

---

Made with 🍕 in Amsterdam.
