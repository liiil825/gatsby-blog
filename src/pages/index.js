import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { getBlogUrl, initLangMenu } from "../utils/localization"
import messages from "../locales"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  let posts = data.allMarkdownRemark.nodes
  const { languages, author } = data.site.siteMetadata
  const { defaultLangKey } = languages
  const { pathname } = location
  const { langKey = languages.defaultLangKey } = pageContext
  languages.langKey = langKey
  const langObj = initLangMenu({
    pathname,
    ...languages,
  })
  if (posts.length === 0) {
    return (
      <Layout
        navMenus={langObj.navMenus}
        langs={languages}
        location={location}
        title={siteTitle}
      >
        <p>{messages[langKey]["No blog posts"]}</p>
      </Layout>
    )
  }

  return (
    <Layout
      navMenus={langObj.navMenus}
      langs={languages}
      location={location}
      title={siteTitle}
      author={author}
    >
      <ol className="global-wrapper" style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const blogUrl = getBlogUrl(langKey, defaultLangKey, post.fields.slug)

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={blogUrl} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query($langRegex: String = "/.zh/") {
    site {
      siteMetadata {
        title
        author {
          name
        }
        languages {
          defaultLangKey
          langs
        }
      }
    }
    allMarkdownRemark(
      filter: { fields: { slug: { regex: $langRegex } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
