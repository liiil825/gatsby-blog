module.exports = {
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      white: '#fff',
    },
    extend: {
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
      },
      textColor: {
        accent: "var(--color-text-accent)",
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
      },
    },
  },
  extend: {
    spacing: {
      128: '32rem',
    },
  },
  variants: {},
  plugins: [],
}