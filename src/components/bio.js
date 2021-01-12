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
import NavLang from "./dropdown-language"
import { FormattedMessage } from "react-intl"
import DarkButton from "./dark-button"

const Bio = ({ navMenus, langs = {} }) => {
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
  // const social = data.site.siteMetadata?.social
  const avatar = data?.avatar?.childImageSharp?.fixed
  const { langKey, defaultLangKey } = langs
  const homeUrl = langKey === defaultLangKey ? "/" : `/${langKey}/`
  const linkClass =
    "my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"

  return (
    <>
      <nav className="shadow">
        <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
          <div className="flex flex-1 justify-between items-center">
            <div>
              <Link to={homeUrl}>
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

            <div className="flex flex-col items-center md:flex-row md:mx-6">
              <Link className={linkClass} to="#">
                <FormattedMessage id="Home" defaultMessage="Home" />
              </Link>
              <Link className={linkClass} to="#">
                <FormattedMessage id="Contact" defaultMessage="Contact" />
              </Link>
              <Link className={linkClass} to="#">
                <FormattedMessage id="About" defaultMessage="About" />
              </Link>
              <NavLang className={linkClass} langs={navMenus} />
              <DarkButton className={linkClass} />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Bio
