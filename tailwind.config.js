/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: ["light", "dark",
      {
        mydark: {
          "primary": "#efefef",
        
          "secondary": "#9f9f9f",
          "accent": "#37CDBE",
          "neutral": "#2b3440",
        "base-content":"#9f9f9f",
        //  "base-100": "#1d2126",
        //  "base-100": "#181818",
         "base-100": "#111",

          "info": "#242627",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
        mylight: {
          "primary": "#1c1d1d",
          "secondary": "#656565",
          "accent": "#37CDBE",
          "neutral": "#53555a",
          "base-content":"#656565",
          "base-100": "#fcfcfc",
          "info": "#f9f9f9",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },

}

