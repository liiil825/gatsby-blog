import React from "react"
import { Link } from "gatsby"
import Bio from "../components/bio"
import SEO from "../components/seo"

const Layout = ({ location, title, children, langs }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="" data-is-root-path={isRootPath}>
      <SEO title="" />
      <Bio langs={langs} />
      <header />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default Layout