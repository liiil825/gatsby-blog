/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { langs, defaultLangKey } = require("../src/locales/languages")
const path = require("path")

const pages = [
  {
    path: "./src/pages/index.js",
    pagePath: "",
  },
  {
    path: "./src/pages/404.js",
    pagePath: "404",
  },
  {
    path: "./src/pages/test.js",
    pagePath: "test",
  },
]

module.exports = ({ actions }) =>
  new Promise(resolve => {
    const { createPage } = actions

    // get all markdown blog posts sorted by date
    for (let i = 0; i < langs.length; i++) {
      let langKey = langs[i]
      if (langKey === defaultLangKey) {
        continue
      }
      pages.forEach(page => {
        const component = path.resolve(page.path)
        createPage({
          path: `/${langKey}/${page.pagePath}`,
          component,
          context: {
            langKey,
            langRegex: `/.${langKey}/`,
          },
        })
      })
    }
    resolve()
  })
