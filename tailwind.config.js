module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sviolet : 'rgb(156, 82, 139)',
        prim1: 'rgb(227, 181, 164)',
        prim2: 'rgb(149, 239, 174)'
      }
    },
  },
  plugins: [],
}
