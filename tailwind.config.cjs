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
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      "2xl": "1920px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "valley-night": "url('/assets/images/backgrounds/bkgd_valley_night.png')"
      },
      boxShadow: {
        "glow": "0 0 15px 0 var(--tw-shadow)"
      },
      colors: {
        "crimson": "#FF0000",
        "crimson-light": "#f06965 !important",
        "audio-player": "rgb(117 65 72 / 80%)",
        "blue-dark": "#0A101E",
        "white-hover": "rgb(255 255 255 / 20%)"
      },
    },
  },
  plugins: [],
}