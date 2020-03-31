import styled from "styled-components"

import {
  absLB,
  absRB,
  absRT,
  borders,
  size,
} from "../lib/baseStyles"

export interface StyledInputWrapperDivProps {
  isTextArea: boolean
}

export const StyledInputWrapperDiv = styled.div`
  display: block;
  position: relative;

  ${({ isTextArea }: StyledInputWrapperDivProps) => `
    .qm-text-field-limit-counter .qm-char-limit-counter-text {
      ${isTextArea ? absRB(0, 0) : absRT(0, "50%")}
      transform: translateY(${isTextArea ? "-0.33em" : "-60%"}) translateX(-0.33em);
    }
  `}

  .qm-text-field-limit-counter .qm-char-limit-counter-bar {
    ${absLB()}
    width: 100%;
  }
`

export const StyledTextAreaLabel = styled.label`
  display: block;
`

export const StyledTextAreaErr = styled.label`
  display: block;
`

interface CommonInputProps {
  charLimit?: number
  hideCharLimitText?: boolean
  ref: (elem: HTMLElement | null) => void
}

export interface StyledTextAreaProps extends CommonInputProps {
  enableTextAreaResize: boolean
}

const commonFieldProps = `
  display: block;
  padding-top: 3px;
  margin: 0;
`

export const StyledTextArea = styled.textarea`
  ${borders()}
  ${size("100%", "auto")}
  ${commonFieldProps}
  padding-right: 0;
  padding-left: 0;

  ${({ enableTextAreaResize }: StyledTextAreaProps) => {
    return `resize: ${enableTextAreaResize ? "auto" : "none"};`
  }}

  ${({ charLimit = 0, hideCharLimitText }: StyledTextAreaProps) => {
    return charLimit && !hideCharLimitText ? "padding-bottom: 1.5em;" : "padding-bottom: 3px;"
  }}
`

export interface StyledInputProps extends CommonInputProps {
  type: string
}

export const StyledInput = styled.input`
  ${borders()}
  ${size("100%", "auto")}
  ${commonFieldProps}
  padding-bottom: 3px;
  padding-left: 0;

  ${({ charLimit = 0, hideCharLimitText }: StyledInputProps) => {
    if (!charLimit || hideCharLimitText) {
      return "padding-right: 0;"
    }

    // We want to display a char count that looks something like "22 / 25".
    // The padding we need is calculated as twice the charlimit + 3 chars for the separator
    // all divided by 2 since the width of a character is about half an em.
    return `padding-right: ${(charLimit.toString().length * 2 + 3)/2}em;`
  }}
`
