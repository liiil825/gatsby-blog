const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const createBlog = require("./gatsby/blog")
const commonPage = require("./gatsby/common")
const onCreateSchema = require("./gatsby/schema")

exports.createPages = async props => {
  await Promise.all([createBlog(props), commonPage(props)])
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
//   const config = getConfig()
//   config.externals = {
//     'react': 'React'
//   }

//   actions.replaceWebpackConfig(config)
// }

exports.createSchemaCustomization = onCreateSchema
