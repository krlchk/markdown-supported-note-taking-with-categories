/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tablet: { max: "1279.99px" },
      mobile: { max: "834.99px" },
      xs: { max: "475.99px" },
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto Mono", "monospace"],
        kanit: ["Kanit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
