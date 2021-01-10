const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const createBlog = require('./createPages/blog')
const commonPage = require('./createPages/common')

exports.createPages = async (props) => {
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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
      languages: Lang
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type Lang {
      langs: [String]
      defaultLangKey: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
      prevId: String
      nextId: String
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
