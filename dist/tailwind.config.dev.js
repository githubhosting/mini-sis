"use strict";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-pattern": "url('https://source.unsplash.com/qDbaQGEwPtI/2400x1823')"
      },
      backdropFilter: {
        none: "none",
        blur: "blur(20px)"
      },
      boxShadow: {
        num_l: ["20px 20px 60px #caced9", "-20px -20px 60px #ffffff"],
        num_d: "3px 3px 3px #1c1d26, -3px -3px 3px #343746",
        num_d0: ["4px 4px 8px #121b33b0", "-4px -4px 8px #121b33"],
        num_d1: ["10px 10px 20px #04070d", "-10px -10px 20px #121b33"],
        num_d2: ["20px 20px 51px #04070d", "-20px -20px 51px #121b33"],
        num_d3: ["30px 30px 51px #04070d", "-30px -30px 51px #121b33"],
        "5xl": ["0 6px 10px -3px rgb(200 200 200 / 0.1)", "0 4px 6px -4px rgb(200 200 200 / 0.1)"],
        "6xl": ["0 20px 25px -5px rgb(255 255 255 / 0.1)", "0 10px 10px -5px rgb(255 255 255 / 0.1)"]
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};