const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components_new/**/*.{js,ts,jsx,tsx}",
    "./styles/templates/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: 'Inter-Regular, regular'
      },
      colors: {
        'gray-450': 'rgb(136, 136, 136)',
        sviolet : 'rgb(156, 82, 139)',
        prim1: 'rgb(227, 181, 164)',
        prim2: 'rgb(149, 239, 174)',
        nftbg: 'rgba(255, 255, 255, 0.10)',
        buttonSelected: 'rgba(18, 115, 234, 0.2)',
        back: 'rgb(29, 30, 44)'
      },
      height: {
        'body': 'calc(100vh - 56px)',
      },
    },
  },
  plugins: [

    //hide scrollbar
    plugin(function({ addComponents }) {
      const components = {
        // ...
        '.hideScroll::-webkit-scrollbar': {
            width: '12px',
        },
        '.hideScroll::-webkit-scrollbar-track': {
          background: 'rgb(33, 37, 41)',
          border: '2px solid theme(\'colors.prim2\')',
          "border-radius": '20px',
        },
        '.hideScroll::-webkit-scrollbar-thumb': {
            "background-color": 'theme(\'colors.prim2\')',
            // "border-radius": '50% / 10%',
            border: '4px solid theme(\'colors.back\')'
        },
      }

      addComponents(components)
    }),

    //splotch
    plugin(function({ addComponents }) {
      const components = {
        '.splotch': {
          backgroundImage: "url(/right-bg-decor.png)",
          backgroundPosition: 'bottom right'
        },
        '.splotch-mobile': {
          backgroundImage: "url(/right-bg-decor-mob.png)",
          backgroundPosition: 'bottom right'
        }
      }

      addComponents(components)
    }),

    //no
    plugin(function({ addComponents }) {
      const components = {
        '.text-overflow-none': {
          'text-overflow': "initial",
          'white-space': 'normal',
          overflow: 'visible'
        },
        '.text-overflow-trunc': {
          'text-overflow': 'ellipsis',
          'white-space': 'nowrap',
          overflow: 'hidden'
        }
      }

      addComponents(components)
    }),
    require("daisyui"),
    require('tailwind-scrollbar'),
  ],
  daisyui: {
    styled: true,
    // themes: true,
    // base: true,
    // utils: true,
    logs: true,
    // rtl: false,
    // prefix: "",
    // darkTheme: "night",
    themes: [
      {
        arlight: {
          primary: "#1273ea",
          secondary: "#1273ea",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#fff",
          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "6px", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "normal-case", // set default text transform for buttons
          "--btn": "",
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem",
        }
      },
      {
        ardark: {
          primary: "#1273ea",
          secondary: "#1273ea",
          accent: "#ADD0E6",
          neutral: "#3d4451",
          "base-100": "#0f1729",
          "base-200": "#000",
          "--btn-text-case": "normal-case", // set default text transform for buttons
          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "6px", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "normal-case", // set default text transform for buttons
          "--btn": "",
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem",

        }
      }
    ]
  },
}