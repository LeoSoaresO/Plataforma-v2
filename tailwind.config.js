module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-100px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.7s ease-out',
      },
    },
    colors: {
      transparent: 'transparent',
      customGray: {
        default: '#A9AEB3',
        light: '#d9e0e6',
        dark: '#484B4D',
        superLight: '#EDEDED',
        textGray: '#8F9BB3',
        superDark: '#231F20',
        iconGray: '#A9AEB3'
      },
      customBlue: {
        default: '#233674',
        light: '#EFF4FA',
        superLight: '#D7E1EC',
        normal: '#004899',
        dark: '#222B45'
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
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      'xs': '1700px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
}