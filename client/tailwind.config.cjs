const { default: themes } = require("daisyui/src/colors/themes")

module.exports = {
    content: ["./src/**/*.{html,js,svelte}"],  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [ `garden`, `forest`], //TODO how do I make this attached to a store?
    //  darkTheme: 'media'
  }
}