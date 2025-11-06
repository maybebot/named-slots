import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/Slot.tsx", "./src/solid/Slot.tsx"],
  platform: "neutral",
  dts: true,
});
