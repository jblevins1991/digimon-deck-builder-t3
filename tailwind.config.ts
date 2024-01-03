import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        card_red: "#ff1c1f",
        card_blue: "#0a1afc",
        card_green: "#3fed00",
        card_yellow: "#f6ff0a",
        card_purple: "#9e1bfc",
        card_black: "#252426",
        card_white: "#FFFFFF"
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
