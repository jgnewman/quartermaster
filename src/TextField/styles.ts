import styled, { css } from "styled-components"

import {
  DEFAULT_BORDER,
  DEFAULT_RADIUS,
  DEFAULT_OUTLINE,
  absLB,
  absRB,
  absRT,
  theme,
} from "../lib/baseStyles"

export const DivTextFieldContainer = styled.div`
  ${theme("textFieldCustom")}
`

export interface DivInputWrapperProps {
  isTextArea: boolean
  isDisabled: boolean
}

export const DivInputWrapper = styled.div<DivInputWrapperProps>`
  display: block;
  position: relative;

  ${({ isTextArea, theme: themeVals }) => {
    const offset = themeVals.textFieldCLOffset
    const yTranslate = offset ? `calc(-1 * (0.75em + ${offset}))` : "-0.33em"

    return `
      .qm-text-field-limit-counter .qm-char-limit-counter-text {
        ${isTextArea ? absRB(0, 0) : absRT(0, "50%")}
        transform: translateY(${isTextArea ? yTranslate : "-60%"}) translateX(-0.33em);
      }
    `
  }}

  .qm-text-field-limit-counter .qm-char-limit-counter-bar {
    ${absLB()}
    width: calc(100% - ${theme("textFieldCLOffset", "1px")} - ${theme("textFieldCLOffset", "1px")});
    border-radius: 0 0 ${theme("textFieldRadius", DEFAULT_RADIUS)} ${theme("textFieldRadius", DEFAULT_RADIUS)};
    margin-left: ${theme("textFieldCLOffset", "1px")};
    margin-right: ${theme("textFieldCLOffset", "1px")};
    margin-bottom: ${theme("textFieldCLOffset", "1px")};
  }

  ${({ isDisabled }) => isDisabled && css`
    .qm-text-field-limit-counter {
      opacity: .25;
    }
  `}
`

export const LabelForTextField = styled.label`
  display: block;
  color: ${theme("textFieldLabelColor")};
  font-size: ${theme("textFieldLabelFontSize")};
  padding: ${theme("textFieldLabelPadding")};
`

export const SpanErrorText = styled.span`
  display: block;
  color: ${theme("textFieldErrColor", "red")};
  font-size: ${theme("textFieldErrFontSize")};
  padding: ${theme("textFieldErrPadding")};
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
  border: ${theme("textFieldBorder", DEFAULT_BORDER)};
  border-radius: ${theme("textFieldRadius", DEFAULT_RADIUS)};

  ${({ isFocused }) => isFocused && css`
    box-shadow: ${theme("textFieldOutlineShadow", DEFAULT_OUTLINE)};
  `}

  color: ${theme("textFieldColor")};
  background: ${theme("textFieldBgColor")};
  line-height: 1;

  width: 100%;
  padding-left: ${theme("textFieldPaddingLeft", 0)};

  &::placeholder {
    color: ${theme("textFieldPlaceholderColor")};
  }

  &[disabled]::placeholder {
    color: ${theme("textFieldDisabledPlaceholderColor")};
  }

  outline: none !important;
`

export interface TextAreaNativeProps extends CommonInputProps {
  enableTextAreaResize: boolean
}

export const TextAreaNative = styled.textarea<TextAreaNativeProps>`
  ${commonFieldProps}
  height: ${theme("textFieldTAHeight")};
  padding-right: ${theme("textFieldPaddingRight", "3px")};
  padding-top: ${theme("textFieldTAPaddingTop", "3px")};

  ${({ enableTextAreaResize }) => {
    return `resize: ${enableTextAreaResize ? "auto" : "none"};`
  }}

  ${({ charLimit = 0, hideCharLimitText }) => {
    return charLimit && !hideCharLimitText
      ? css`padding-bottom: ${theme("textFieldTAPaddingBottomCL", "1.5em")};`
      : css`padding-bottom: ${theme("textFieldPaddingBottom", "3px")};`
  }}
`

export interface InputNativeProps extends CommonInputProps {
  type: string
}

export const InputNative = styled.input<InputNativeProps>`
  ${commonFieldProps}
  padding-top: ${theme("textFieldPaddingTop", "3px")};
  height: ${theme("textFieldHeight")};

  ${({ charLimit = 0, hideCharLimitText }) => {
    if (!charLimit) {
      return css`padding-bottom: ${theme("textFieldPaddingBottom", "3px")};`
    }

    if (charLimit && hideCharLimitText) {
      return css`
        padding-bottom: ${theme("textFieldPaddingBottomCL", "8px")};
        padding-right: ${theme("textFieldPaddingRight", "3px")};
      `
    }

    // We want to display a char count that looks something like "22 / 25".
    // The padding we need is calculated as twice the charlimit + 3 chars for the separator
    // all divided by 2 since the width of a character is about half an em.
    return css`
      padding-bottom: ${theme("textFieldPaddingBottomCL", "8px")};
      padding-right: ${(charLimit.toString().length * 2 + 3)/2}em;
    `
  }}
`
