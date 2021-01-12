import React from "react"
import { ThemeContext } from './theme-context'

const Toggle = () => {
  const { theme, setTheme } = React.useContext(ThemeContext)

  function isDark() {
    return theme === "dark"
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={isDark()}
        onChange={e => setTheme(e.target.checked ? "dark" : "light")}
      ></input>
      Dark Mode
    </label>
  )
}

export default Toggle