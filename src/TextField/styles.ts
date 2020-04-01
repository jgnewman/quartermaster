import styled, { css } from "styled-components"

import {
  DEFAULT_BORDER,
  DEFAULT_RADIUS,
  absLB,
  absRB,
  absRT,
  theme,
} from "../lib/baseStyles"

export interface StyledInputWrapperDivProps {
  isTextArea: boolean
}

export const StyledInputWrapperDiv = styled.div<StyledInputWrapperDivProps>`
  display: block;
  position: relative;

  ${({ isTextArea }) => `
    .qm-text-field-limit-counter .qm-char-limit-counter-text {
      ${isTextArea ? absRB(0, 0) : absRT(0, "50%")}
      transform: translateY(${isTextArea ? "-0.33em" : "-60%"}) translateX(-0.33em);
    }
  `}

  .qm-text-field-limit-counter .qm-char-limit-counter-bar {
    ${absLB()}
    width: calc(100% - ${theme("textFieldCLOffset", "1px")} - ${theme("textFieldCLOffset", "1px")});
    border-radius: 0 0 ${theme("textFieldRadius", DEFAULT_RADIUS)} ${theme("textFieldRadius", DEFAULT_RADIUS)};
    margin-left: ${theme("textFieldCLOffset", "1px")};
    margin-right: ${theme("textFieldCLOffset", "1px")};
    margin-bottom: ${theme("textFieldCLOffset", "1px")};
  }

  ${theme("textFieldCustom")}
`

export const StyledTextAreaLabel = styled.label`
  display: block;
  color: ${theme("textFieldColor")};
`

export const StyledTextAreaErr = styled.label`
  display: block;
  color: ${theme("textFieldErrColor", "red")};
`

interface CommonInputProps {
  charLimit?: number
  hideCharLimitText?: boolean
  ref: (elem: HTMLElement | null) => void
}

export interface StyledTextAreaProps extends CommonInputProps {
  enableTextAreaResize: boolean
}

const commonFieldProps = css`
  display: block;
  margin: 0;
  box-sizing: border-box;
  border: ${theme("textFieldBorder", DEFAULT_BORDER)};
  border-radius: ${theme("textFieldRadius", DEFAULT_RADIUS)};
  width: 100%;
  padding-left: ${theme("textFieldPaddingLeft", 0)};
  padding-top: ${theme("textFieldPaddingTop", "3px")};
`

export const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  ${commonFieldProps}
  height: ${theme("textFieldHeight")};
  padding-right: ${theme("textFieldPaddingRight", "3px")};

  ${({ enableTextAreaResize }) => {
    return `resize: ${enableTextAreaResize ? "auto" : "none"};`
  }}

  ${({ charLimit = 0, hideCharLimitText }) => {
    return charLimit && !hideCharLimitText
      ? css`padding-bottom: ${theme("textFieldPaddingBottomTACL", "1.5em")};`
      : css`padding-bottom: ${theme("textFieldPaddingBottom", "3px")};`
  }}
`

export interface StyledInputProps extends CommonInputProps {
  type: string
}

export const StyledInput = styled.input<StyledInputProps>`
  ${commonFieldProps}

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
