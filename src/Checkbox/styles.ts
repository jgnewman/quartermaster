import styled from "styled-components"

const blockAbs = `
  display: block;
  position: absolute;
`

const absoluteTL = `
  ${blockAbs}
  top: 0;
  left: 0;
`

const absoluteFill = `
  ${absoluteTL}
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

export const StyledCheckboxOverlaySpan = styled.span`
  ${absoluteFill}
  background: white;
  border: 1px solid black;
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 0.66em;

  .qm-checkbox-checkmark {
    ${blockAbs}
    top: -0.1em;
    left: 0;
  }
`

export const StyledCheckboxLabel = styled.label`
  vertical-align: middle;
`
