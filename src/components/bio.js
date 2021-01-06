/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { Link } from "gatsby"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/logo.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <>
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
          <div className="flex justify-between items-center">
              <div>
                <Link to="/">
                  <Image
                    fixed={avatar}
                    alt={author?.name || ``}
                    className="bio-avatar"
                    imgStyle={{
                      borderRadius: `50%`,
                    }}
                  />
                </Link>
              </div>
              
              <div className="flex md:hidden">
                  <button type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                          <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                      </svg>
                  </button>
              </div>
          </div>

          <div className="md:flex items-center">
              <div className="flex flex-col md:flex-row md:mx-6">
                  <Link className="my-1 text-sm text-gray-700 dark:text-gray-200 font-medium hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0" to="#">Home</Link>
                  <Link className="my-1 text-sm text-gray-700 dark:text-gray-200 font-medium hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0" to="#">Contact</Link>
                  <Link className="my-1 text-sm text-gray-700 dark:text-gray-200 font-medium hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0" to="#">About</Link>
              </div>
          </div>
      </div>
    </nav>
  </>
  )
}

export default Bio
