import styled, { css } from "styled-components"

export interface StyledInputWrapperDivProps {
  isTextArea: boolean
}

export const StyledInputWrapperDiv = styled.div`
  display: inline-block;
  position: relative;

  ${({ isTextArea }: StyledInputWrapperDivProps) => css`
    .qm-text-field-limit-counter .qm-char-limit-counter-text {
      position: absolute;
      top: ${isTextArea ? "auto" : "50%"};
      bottom: ${isTextArea ? "0" : "auto"};
      right: 0;
      transform: translateY(${isTextArea ? "-0.33em" : "-50%"}) translateX(-0.33em);
    }
  `}

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
  hideCharLimitText?: boolean
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

  ${({ charLimit = 0, hideCharLimitText }: StyledTextAreaProps) =>
    charLimit && !hideCharLimitText && css`
      padding-bottom: 1.5em;
    `
  }
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
