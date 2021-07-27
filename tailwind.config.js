module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-50px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
      },
    },
    colors: {
      transparent: 'transparent',
      customGray: {
        light: '#d9e0e6',
        dark: '#484B4D',
        superLight: '#EDEDED',
        textGray: '#8F9BB3',
        superDark: '#231F20'
      },
      customBlue: {
        default: '#233674',
        light: '#EFF4FA',
        superLight: '#D7E1EC'
      },
      customWhite: {
        default: '#ffffff',
        lightDark: '#F8F8F8',
        bWhite: '#EFF4FA'
      },
      customRed: {
        default: '#B10000'
      },
      customGreen: {
        default: '#8BD42D'
      },
      inicieColors: {
        orange: '#F36C48',
        blue: '#233674'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}