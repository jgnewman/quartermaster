import styled, { css } from "styled-components"

import {
  DEFAULT_BORDER,
  DEFAULT_RADIUS,
  DEFAULT_OUTLINE,
  absLB,
  absRB,
  absRT,
  createThemer,
} from "../lib/baseStyles"

const theme = createThemer("textField")

export const DivTextFieldContainer = styled.div`
  ${theme("custom")}
`

export interface DivInputWrapperProps {
  isTextArea: boolean
  isDisabled: boolean
}

export const DivInputWrapper = styled.div<DivInputWrapperProps>`
  display: block;
  position: relative;

  ${({ isTextArea, theme: themeVals }) => {
    const offset = themeVals.textField.clOffset
    const clSize = themeVals.charLimitCounter.barHeight
    const yTranslate = offset ? `calc(-1 * (${clSize || "5px"} + 0.25em +  ${offset}))` : "-0.33em"

    return `
      .qm-text-field-limit-counter .qm-char-limit-counter-text {
        ${isTextArea ? absRB(0, 0) : absRT(0, "50%")}
        transform: translateY(${isTextArea ? yTranslate : "-60%"}) translateX(-0.33em);
      }
    `
  }}

  .qm-text-field-limit-counter .qm-char-limit-counter-bar {
    ${absLB()}
    width: calc(100% - ${theme("clOffset", "1px")} - ${theme("clOffset", "1px")});
    border-radius: 0 0 ${theme("radius", DEFAULT_RADIUS)} ${theme("radius", DEFAULT_RADIUS)};
    margin-left: ${theme("clOffset", "1px")};
    margin-right: ${theme("clOffset", "1px")};
    margin-bottom: ${theme("clOffset", "1px")};
  }

  ${({ isDisabled }) => isDisabled && css`
    .qm-text-field-limit-counter {
      opacity: .25;
    }
  `}
`

export const LabelForTextField = styled.label`
  display: block;
  color: ${theme("labelColor")};
  font-size: ${theme("labelFontSize")};
  font-weight: ${theme("labelFontWeight")};
  padding: ${theme("labelPadding")};
`

export const SpanErrorText = styled.span`
  display: block;
  color: ${theme("errColor", "red")};
  font-size: ${theme("errFontSize")};
  padding: ${theme("errPadding")};
`

interface CommonInputProps {
  isFocused: boolean
  charLimit?: number
  hideCharLimitText?: boolean
  ref: (elem: HTMLElement | null) => void
}

const commonFieldProps = css<CommonInputProps>`
  display: block;
  margin: 0;

  box-sizing: border-box;
  border: ${theme("border", DEFAULT_BORDER)};
  border-radius: ${theme("radius", DEFAULT_RADIUS)};

  ${({ isFocused }) => isFocused && css`
    box-shadow: ${theme("outlineShadow", DEFAULT_OUTLINE)};
  `}

  color: ${theme("color")};
  background: ${theme("bgColor")};
  line-height: 1;

  width: 100%;
  padding-left: ${theme("paddingLeft", 0)};

  &::placeholder {
    color: ${theme("placeholderColor")};
  }

  &[disabled]::placeholder {
    color: ${theme("disabledPlaceholderColor")};
  }

  outline: none !important;
`

export interface TextAreaNativeProps extends CommonInputProps {
  enableTextAreaResize: boolean
}

export const TextAreaNative = styled.textarea<TextAreaNativeProps>`
  ${commonFieldProps}
  height: ${theme("taHeight")};
  padding-right: ${theme("paddingRight", "3px")};
  padding-top: ${theme("taPaddingTop", "3px")};

  ${({ enableTextAreaResize }) => {
    return `resize: ${enableTextAreaResize ? "auto" : "none"};`
  }}

  ${({ charLimit = 0, hideCharLimitText }) => {
    return charLimit && !hideCharLimitText
      ? css`padding-bottom: ${theme("taPaddingBottomCL", "1.5em")};`
      : css`padding-bottom: ${theme("paddingBottom", "3px")};`
  }}
`

export interface InputNativeProps extends CommonInputProps {
  type: string
}

export const InputNative = styled.input<InputNativeProps>`
  ${commonFieldProps}
  padding-top: ${theme("paddingTop", "3px")};
  height: ${theme("height")};

  ${({ charLimit = 0, hideCharLimitText }) => {
    if (!charLimit) {
      return css`padding-bottom: ${theme("paddingBottom", "3px")};`
    }

    if (charLimit && hideCharLimitText) {
      return css`
        padding-bottom: ${theme("paddingBottomCL", "8px")};
        padding-right: ${theme("paddingRight", "3px")};
      `
    }

    // We want to display a char count that looks something like "22 / 25".
    // The padding we need is calculated as twice the charlimit + 3 chars for the separator
    // all divided by 2 since the width of a character is about half an em.
    return css`
      padding-bottom: ${theme("paddingBottomCL", "8px")};
      padding-right: ${(charLimit.toString().length * 2 + 3)/2}em;
    `
  }}
`
