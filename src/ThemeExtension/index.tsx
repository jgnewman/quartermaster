import React, {
  ReactNode,
  memo,
} from "react"

import Theme, { ThemeProps } from "../Theme"

export interface ThemeExtensionProps extends ThemeProps {
  base: ThemeProps["data"]
  children?: ReactNode
}

function ThemeExtension({
  base,
  data,
  children,
}: ThemeExtensionProps) {

  return (
    <Theme data={data}>
      <Theme data={base}>
        {children}
      </Theme>
    </Theme>
  )
}

ThemeExtension.displayName = "ThemeExtension"

export default memo(ThemeExtension)
