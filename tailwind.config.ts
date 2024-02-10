import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      colors: {
        black: "#111114",
        lightblack: "#18181d",
        grey: "#b4b4b4",
        primary: "#5773ff",
      },

      height: {
        50: "12.5rem",
      },
      width: {
        50: "12.5rem",
      },
      maxWidth: {
        50: "12.5rem",
      },
    },
  },
};
