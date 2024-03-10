import tailwindConfig from './tailwind.config.js'

const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const config = {
  plugins: [
    //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    tailwindcss(tailwindConfig),
    //But others, like autoprefixer, need to run after,
    autoprefixer,
  ],
};

module.exports = config;
