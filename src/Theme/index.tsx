/**
 * Theme
 *
 * Takes data describing how to build a stylesheet.
 * Builds and injects the stylesheet on mount.
 * Removes the stylesheet on unmount.
 *
 * <Theme
 *   data={{
 *     "background": {
 *       "#000000": `
 *         .foo,
 *         .bar.baz,
 *         #quux[disabled]
 *       `
 *     },
 *     "border-radius": {
 *       "50%": `.foo, .bar.baz, #quux[disabled]`
 *     }
 *   }}
 * />
 */
import { PureComponent } from "react"

interface ValueSpec {
  [key: string]: string
}

interface CSSData {
  [key: string]: ValueSpec
}

export interface ThemeProps {
  data: CSSData | null
}

class Theme extends PureComponent<ThemeProps> {
  static displayName = "Theme"

  public state = {
    id: `qm-${String(Date.now()).slice(9)}-${String(Math.random()).slice(2, 6)}`,
  }

  private tag: HTMLElement
  private prevStyles = ""

  buildCSSChunk(propName: string, propSpec: ValueSpec): string {
    return Object.keys(propSpec).map(color => {
      const selector: string = propSpec[color]
        .trim()
        .replace(/,$/, "") // forgive trailing commas on selectors
        .replace(/\n\s*/g, "\n") // remove indentation in template strings

      return `${selector} {\n${propName}: ${color};\n}`
    }).join("\n")
  }

  buildCSSStyles() {
    const { data } = this.props

    if (!data) {
      return ""
    }

    return Object.keys(data).map(propName => {
      return`${this.buildCSSChunk(propName, data[propName])}\n`
    }).join("")
  }

  updateStyles() {
    const newStyles = this.buildCSSStyles()
    if (newStyles !== this.prevStyles) {
      this.tag.innerHTML = newStyles
      this.prevStyles = newStyles
    }
  }

  buildStyleTag() {
    const tag = document.createElement("style")
    tag.setAttribute("type", "text/css")
    tag.setAttribute("id", this.state.id)

    this.tag = tag
    document.head.appendChild(tag)
  }

  removeStyleTag() {
    this.tag?.parentNode?.removeChild(this.tag)
  }

  componentDidMount() {
    this.buildStyleTag()
    this.updateStyles()
  }

  componentDidUpdate() {
    this.updateStyles()
  }

  componentWillUnmount() {
    this.removeStyleTag()
  }

  render() {
    return this.props.children
  }
}

export default Theme
