const fs = require('fs')
const colors = require('./colors.js');

const { brand } = colors

let tempStr = ``;
for (key in colors) {
  if (key === 'brand') {
    continue
  }
  tempStr = `${tempStr}        ${key}: {`
  for (num in colors[key]) {
    tempStr = `${tempStr}
          '${num}': 'var(--color-${key}-${num})',`
  }
  tempStr = `${tempStr}
        },
`
}

const data = `module.exports = {
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      white: '#fff',
    },
    extend: {
      colors: {
${tempStr}      },
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
  extend: {},
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
}
`

fs.writeFile('../tailwind.config.js', data, function (err) {
  if (err) return console.log(err);
  console.log('finish!!!');
});
