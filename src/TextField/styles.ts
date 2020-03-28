import React from "react"
import styled, { css } from "styled-components"

export interface StyledInputWrapperDivProps {
  className: string
  isTextArea: boolean
}

export const StyledInputWrapperDiv = styled.div`
  display: inline-block;
  position: relative;

  ${({ isTextArea }: StyledInputWrapperDivProps) => {
    if (isTextArea) {
      return css`
        .qm-text-field-limit-counter .qm-char-limit-counter-text {
          position: absolute;
          bottom: 0;
          right: 0;
          transform: translateY(-0.33em) translateX(-0.33em);
        }
      `
    } else {
      return css`
        .qm-text-field-limit-counter .qm-char-limit-counter-text {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%) translateX(-0.33em);
        }
      `
    }
  }}

  .qm-text-field-limit-counter .qm-char-limit-counter-bar {
    position: absolute;
    left: 0;
    bottom: 0;
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
  className: string
  disabled: boolean
  hideCharLimitText?: boolean
  onChange: React.ChangeEventHandler
  onKeyUp: number
  placeholder: string
  ref: (elem: HTMLElement | null) => void
}

export interface StyledTextAreaProps extends CommonInputProps {
  enableTextAreaResize: boolean
}

export const StyledTextArea = styled.textarea`
  display: block;

  ${({ enableTextAreaResize }: StyledTextAreaProps) => css`
    resize: ${enableTextAreaResize ? "auto" : "none"};
  `}

  ${({ charLimit = 0, hideCharLimitText }: StyledTextAreaProps) => {
    if (!charLimit || hideCharLimitText) {
      return ""
    }

    return css`
      padding-bottom: 1.5em;
    `
  }}
`

export interface StyledInputProps extends CommonInputProps {
  type: string
}

export const StyledInput = styled.input`
  display: block;

  ${({ charLimit = 0, hideCharLimitText }: StyledInputProps) => {
    if (!charLimit || hideCharLimitText) {
      return ""
    }

    // We want to display a char count that looks something like "22 / 25".
    // The padding we need is calculated as twice the charlimit + 3 chars for the separator
    // all divided by 2 since the width of a character is about half an em.
    return css`
      padding-right: ${(charLimit.toString().length * 2 + 3)/2}em;
    `
  }}
`
