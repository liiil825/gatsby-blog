import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import { initLangMenu } from '../utils/localization'

const BlogPostTemplate = ({ data, location, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { languages } = data.site.siteMetadata
  const { previous, next } = data
  const { pathname } = location
  languages.langKey = pageContext.langKey
  const langObj = initLangMenu({
    pathname,
    ...languages,
    previous,
    next,
  })

  return (
    <Layout navMenus={langObj.navMenus} langs={languages} className="" location={location} title={siteTitle}>
      <article
        className="global-wrapper blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
        </footer>
      </article>
      <nav className="global-wrapper blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={langObj.prevUrl} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={langObj.nextUrl} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $prevId: String
    $nextId: String
  ) {
    site {
      siteMetadata {
        title
        languages {
          defaultLangKey
          langs
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        description
      }
    }
    previous: markdownRemark(id: { eq: $prevId }) {
      id
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextId }) {
      id
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
