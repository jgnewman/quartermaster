export { ThemeProvider as default } from "styled-components"

export interface ThemeProps {

  avatar: {
    border?: string
    custom?: string
    height?: string
    indicatorBorder?: string
    indicatorOffColor?: string
    indicatorOnColor?: string
    radius?: string
    width?: string
  }

  button: {
    bgColor?: string
    border?: string
    contentColor?: string
    custom?: string
    fontWeight?: string
    fontSize?: string
    fontFamily?: string
    fontStyle?: string
    hoverBorder?: string
    hoverBgColor?: string
    hoverContentColor?: string
    hoverNegativeBorder?: string
    hoverNegativeBgColor?: string
    hoverNegativeContentColor?: string
    hoverPositiveBorder?: string
    hoverPositiveBgColor?: string
    hoverPositiveContentColor?: string
    negativeBorder?: string
    negativeBgColor?: string
    negativeContentColor?: string
    outlineShadow?: string
    padding?: string
    positiveBorder?: string
    positiveBgColor?: string
    positiveContentColor?: string
    radius?: string
  }

  charLimitCounter: {
    barBgBest?: string
    barBgBetter?: string
    barBgDecent?: string
    barBgEmpty?: string
    barBgError?: string
    barBgWorse?: string
    barBgWorst?: string
    barHeight?: string
    color?: string
    custom?: string
    errTextColor?: string
    fontSize?: string
  }

  checkbox: {
    bgColor?: string
    border?: string
    checkColor?: string
    checkedLabelColor?: string
    checkedBgColor?: string
    custom?: string
    disabledLabelColor?: string
    labelColor?: string
    labelMargin?: string
    outlineShadow?: string
    radius?: string
    size?: string
  }

  confirmButton: {
    cancelMargin?: string
    confirmMargin?: string
    titleColor?: string
  }

  modal: {
    bgColor?: string
    custom?: string
  }

  radioButton: {
    bgColor?: string
    border?: string
    checkedBgColor?: string
    checkedLabelColor?: string
    custom?: string
    disabledLabelColor?: string
    dotColor?: string
    dotSize?: string
    labelColor?: string
    labelMargin?: string
    outlineShadow?: string
    size?: string
  }

  select: {
    bgColor?: string
    border?: string
    caretBgColor?: string
    caretIconColor?: string
    caretIconHoverColor?: string
    caretPadding?: string
    clearBgColor?: string
    clearIconColor?: string
    clearIconHoverColor?: string
    clearPadding?: string
    color?: string
    custom?: string
    disabledPlaceholderColor?: string
    fieldPadding?: string
    labelColor?: string
    labelFontSize?: string
    labelFontWeight?: string
    labelPadding?: string
    menuBgColor?: string
    menuBorder?: string
    menuRadius?: string
    menuShadow?: string
    optionBgColor?: string
    optionColor?: string
    optionHoverBgColor?: string
    optionHoverColor?: string
    optionPadding?: string
    optionSelectedBgColor?: string
    optionSelectedColor?: string
    outlineShadow?: string
    placeholderColor?: string
    radius?: string
  }

  textField: {
    bgColor?: string
    border?: string
    clOffset?: string // should include a unit and is usually the same width as your border
    color?: string
    custom?: string
    disabledPlaceholderColor?: string
    errColor?: string
    errFontSize?: string
    errPadding?: string
    height?: string
    labelColor?: string
    labelFontSize?: string
    labelFontWeight?: string
    labelPadding?: string
    outlineShadow?: string
    paddingBottom?: string
    paddingBottomCL?: string // text field with char limit
    paddingLeft?: string
    paddingRight?: string
    paddingTop?: string
    placeholderColor?: string
    radius?: string
    taHeight?: string
    taPaddingBottomCL?: string // text area with char limit
    taPaddingTop?: string
  }

}

export const DefaultTheme: ThemeProps = {
  avatar: {},
  button: {},
  charLimitCounter: {},
  checkbox: {},
  confirmButton: {},
  modal: {},
  radioButton: {},
  select: {},
  textField: {},
}

export function extendTheme(theme: ThemeProps, config: Partial<ThemeProps>): ThemeProps {
  return Object.keys(theme).reduce((accum: any, componentName) => {
    const baseProps = theme[componentName]
    const configProps = config[componentName] || {}
    const component = accum[componentName] = { ...baseProps }

    Object.keys(configProps).forEach(propName => {
      if (propName === "custom") {
        component[propName] = (component[propName] || "") + ";\n" + configProps[propName]
      } else {
        component[propName] = configProps[propName]
      }
    })

    return accum
  }, {})
}
