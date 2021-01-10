/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { langs, defaultLangKey } = require('../data/languages')
const path = require('path')
const { createLanguagesObject, getCurrentLangKey, getBlogUrl } = require('../src/utils/localization')

const query = (lang) => (
  `
    {
      allMarkdownRemark(
        filter: {
          fields: {
            slug: { regex: "/.${lang}/" }
          }
        }
        sort: { fields: [frontmatter___date], order: ASC }
        limit: 1000
      ) {
        nodes {
          id
          frontmatter {
            date
          }
          fields {
            slug
          }
        }
      }
    }
  `
)

module.exports =  ({ graphql, actions, reporter }) => 
  new Promise(resolve => {
    const { createPage } = actions

    const blogPost = path.resolve(`./src/templates/blog-post.js`)

    // get all markdown blog posts sorted by date
    langs.forEach(lang => {
      const graphStr = query(lang)
      graphql(graphStr).then(({ data, errors }) => {
        if (errors) {
          reporter.paniconbuild(
            `there was an error loading your blog posts`,
            errors
          )
          return
        }

        const posts = data.allMarkdownRemark.nodes

        // Create each individual project
        Promise.all(posts.map((post, index) => {
          const prevId = index === 0 ? null : posts[index - 1].id
          const nextId = index === posts.length - 1 ? null : posts[index + 1].id
          const language = getCurrentLangKey(post.fields.slug)
          const localPath = getBlogUrl(language, defaultLangKey, post.fields.slug)

          // create blog posts pages
          // but only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
          // `context` is available in the template as a prop and as a variable in graphql
          createPage({
            path: localPath,
            component: blogPost,
            context: {
              id: post.id,
              prevId,
              nextId,
              langKey: language,
              defaultLangKey,
            },
          })
        })).then(resolve)
      })
    })
  })