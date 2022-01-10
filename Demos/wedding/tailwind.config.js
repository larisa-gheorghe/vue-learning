module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'turqoise': '#bcf4de',
        'intense-pink': '#ffb7c3',
        'light-green': '#cde5d7',
        'light-pink': '#ded6d1',
        'pink': '#eec6ca',
      },
      backgroundImage: {
        'leafs-texture': 'url(/assets/img/background.jpg)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
