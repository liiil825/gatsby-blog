const fs = require('fs')
const colors = require('./colors.js');

const { brand } = colors

let tempStr = ``;
for (key in colors) {
  if (key === 'brand') {
    continue
  }
  for (num in colors[key]) {
    tempStr = `${tempStr}--color-${key}-${num}: ${colors[key][num]};
  `
  }
}

const data = `:root {
  --color-primary: ${brand};
  --color-text: #566c73;
  --color-text-light: #4f5969;
  --color-heading: #0b1013;
  --color-heading-black: black;
  --color-accent: #d1dce5;
  ${tempStr}
  @apply light;
}

.dark {
  --color-bg-primary: #0b1013;
  --color-bg-secondary: #283141;
  --color-primary: var(--denim-600);
  --color-text-primary: var(--denim-800);
  --color-text-secondary: #e2e8f0;
  --color-text-accent: #81e6d9;
  --color-heading: var(--denim-800);
  --color-heading-black: var(--denim-900);
}

.dark h1,
.dark h2,
.dark h3,
.dark h4,
.dark h5,
.dark h6 {
  --color-heading: var(--denim-800);
  --color-heading-black: var(--denim-800);
}

.light {
  --color-bg-primary: white;
  --color-bg-secondary: #edf2f7;
  --color-text-primary: #2d3748;
  --color-text-secondary: #4a5568;
  --color-text-accent: #2b6cb0;
}
`

fs.writeFile('../src/css/colors.css', data, function (err) {
  if (err) return console.log(err);
  console.log('finish!!!');
});
