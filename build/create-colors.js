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
  --color-text-primary: #f7fafc;
  --color-text-secondary: #e2e8f0;
  --color-text-accent: #81e6d9;
  --color-heading: #e2e8f0;
  --color-heading-black: #f7fafc;
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
