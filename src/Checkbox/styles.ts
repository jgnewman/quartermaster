import styled from "styled-components"

import {
  absCenter,
  absFill,
  borders,
  size,
  vertMiddle,
  vertMiddleInner,
} from "../lib/baseStyles"

export const StyledCheckboxWrapperSpan = styled.span`
  ${vertMiddle()}
  ${size("1em")}

  position: relative;
  margin-right: .33em;
`

export const StyledCheckbox = styled.input`
  ${absFill()}
  border: 0;
`

export const StyledCheckboxOverlaySpan = styled.span`
  ${absFill()}
  ${borders()}
  background: white;

  .qm-checkbox-checkmark {
    ${absCenter()}
    ${size("85%")}
  }
`

export const StyledCheckboxLabel = styled.label`
  ${vertMiddleInner()}
`
