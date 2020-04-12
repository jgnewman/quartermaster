import React, { PureComponent } from "react"

import Theme, { ThemeProps } from "../Theme"

export interface ThemeExtensionProps extends ThemeProps {
  base: ThemeProps["data"]
}

class ThemeExtension extends PureComponent<ThemeExtensionProps> {
  static displayName = "ThemeExtension"

  render() {
    const { base, data, children } = this.props

    return (
      <Theme data={data}>
        <Theme data={base}>
          {children}
        </Theme>
      </Theme>
    )
  }
}

export default ThemeExtension
