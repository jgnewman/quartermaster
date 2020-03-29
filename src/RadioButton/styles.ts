import styled, { css } from "styled-components"

const absoluteFill = `
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const StyledRadioButtonWrapperSpan = styled.span`
  position: relative;
  width: 1em;
  height: 1em;

  display: inline-block;
  vertical-align: middle;
  margin-right: .33em;
`

export const StyledRadioButton = styled.input`
  ${absoluteFill}
  border: 0;
`

export interface StyledRadioButtonOverlaySpanProps {
  checked: boolean
}

export const StyledRadioButtonOverlaySpan = styled.span`
  ${absoluteFill}
  background: white;
  border: 1px solid black;
  border-radius: 50%;
  box-sizing: border-box;

  ${({ checked }: StyledRadioButtonOverlaySpanProps) => checked && css`
    &::after {
      ${absoluteFill}
      content: "";
      background: black;
      border-radius: 50%;
      transform: scale(0.50);
      transform-origin: center;
      box-sizing: border-box;
    }
  `}
`

export const StyledRadioButtonLabel = styled.label`
  vertical-align: middle;
`
