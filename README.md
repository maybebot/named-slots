# named-slots

Slots for preact, react and solid in under 0.2Kb.

Slots allow to define "holes" in your components that can be filled with JSX.
Inspired by slots in Vue/Svelte/Angular/WebComponents.

<img align="right" width="50" height="50" src="https://github.com/maybebot/named-slots/blob/main/frameworks/solid/solid.svg">
<img align="right" width="50" height="50" src="https://github.com/maybebot/named-slots/blob/main/frameworks/react/react.svg">
<img align="right" width="50" height="50" src="https://github.com/maybebot/named-slots/blob/main/frameworks/preact/preact.svg">

```sh
npm i named-slots
```

## Quick start

### Defining slots

Set the names of the slots you're using with `defineSlots` and use them in your JSX like `<Slot name="slotName">`, where want the slotted content to appear.

```tsx
import { defineSlots } from "named-slots";

export const Card = ({ children }) => {
  const { Slot } = defineSlots(children, ["header", "content", "footer"]);

  return (
    <div className="card">
      <Slot name="header"></Slot>
      <Slot name="content">
        <div>Fallback content</div>
      </Slot>
      <div>
        <Slot name="footer">Fallback footer</Slot>
      </div>
    </div>
  );
};
```

### Consuming components with Slots

Now you can slot content into your Card component. The only thing you need to do is set a `slot="slotName"` on the element you wish to slot in. To render only text or multiple elements, use the `<template>` element.

```tsx
<Card>
  <div slot="header">This div is not semantic</div>
  <RandomComponent slot="content" />
  <template slot="footer">
    <div>One</div>
    <div>Two</div>
  </template>
</Card>
```

## Fallback

When defining a `<Slot>` the content inside of it will be treated as fallback, in case nothing is slotted inside of that slot. If you do not want anything to be rendered, self-close the slot tag `<Slot name="nofallback" />`.

```
<ActionBar>
  <Slot name="left" /> {/* no fallback, will not render unless slotted*/}
  <Slot name="right">Loading...</Slot> {/* Will render "Loading..." until slotted */}
</ActionBar>
```

## defineSlots and hasSlot

The `defineSlots` function handles the usage of slots. It takes the `children` prop of the component where it's used, and a string array of the slot names. If using Typescript add a `as const` to the string array so Typescript can check if the slot names are typed correctly.

`defineSlots` returns an object with the `Slot` component, but also a `hasSlot` function that allows to check if a slot has been slotted in, for conditional rendering.

```tsx
export const DefinedCard = ({ children }: { children: Slottable }) => {
  const { Slot, hasSlot } = defineSlots(children, ["header", "content", "footer"] as const);

  const hasContent: boolean = hasSlot("content");
```

## With Solid.js

Since solid does not use a VDOM it has a dedicated import.

```ts
import { Slot } from "named-slots/solid";
```

In addition every element with `slot` needs to be an HTML element, not a Solid component (or wrapped in one like the `<template>`). In the example above, `<RandomComponent slot="content" />` would not work. `<div ="content"><RandomComponent slot="content" /></div>` would.

---

Made with 🍕 in Amsterdam.
