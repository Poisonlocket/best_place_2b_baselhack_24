/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");

module.exports = {
  daisyui: {
    themes: ["light", "dark", "pastel"],
  },
  content : [ 
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [ 
    flowbite.plugin(),
      require("daisyui")
  ]
}

