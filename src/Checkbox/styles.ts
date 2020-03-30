import styled, { css } from "styled-components"

const absoluteFill = `
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const StyledCheckboxWrapperSpan = styled.span`
  position: relative;
  width: 1em;
  height: 1em;

  display: inline-block;
  vertical-align: middle;
  margin-right: .33em;
`

export const StyledCheckbox = styled.input`
  ${absoluteFill}
  border: 0;
`

export interface StyledCheckboxOverlaySpanProps {
  isChecked: boolean
}

export const StyledCheckboxOverlaySpan = styled.span`
  ${absoluteFill}
  background: white;
  border: 1px solid black;
  border-radius: 3px;
  box-sizing: border-box;

  ${({ isChecked }: StyledCheckboxOverlaySpanProps) => isChecked && css`
    &::after {
      ${absoluteFill}
      content: "✔";
      text-align: center;
      line-height: 100%;
    }
  `}
`

export const StyledCheckboxLabel = styled.label`
  vertical-align: middle;
`
