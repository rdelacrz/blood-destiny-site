/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./renderer/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
  ],
  theme: {
    screens: {
      sm: "600px",
      md: "968px",
      lg: "1200px",
      xl: "1600px",
      "2xl": "1920px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "valley-night": "url('/assets/images/backgrounds/bkgd_valley_night.png')",
        "olympia-hallway": "url('/assets/images/backgrounds/bkgd_olympia_hallway.png')",
      },
      boxShadow: {
        "glow": "0 0 24px 0 var(--tw-shadow)"
      },
      colors: {
        "crimson": "#FF0000",
        "crimson-light": "#f06965 !important",
        "audio-player": "rgb(117 65 72 / 80%)",
        "blue-dark": "#0A101E",
        "white-hover": "rgb(85 85 85 / 60%)"
      },
      dropShadow: {
        "subtle-outline": "1px 1px 1px black"
      },
      fontFamily: {
        "prosto-one": ["Prosto One"],
        "poppins": ["Poppins"],
      },
    },
  },
  plugins: [],
}