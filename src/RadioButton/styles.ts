import styled from "styled-components"

import {
  absCenter,
  absFill,
  borders,
  size,
  vertMiddle,
  vertMiddleInner,
} from "../lib/baseStyles"

export const StyledRadioButtonWrapperSpan = styled.span`
  ${size("1em")}
  ${vertMiddle()}

  position: relative;
  margin-right: .33em;
`

export const StyledRadioButton = styled.input`
  ${absFill()}
  border: 0;
`

export const StyledRadioButtonOverlaySpan = styled.span`
  ${absFill()}
  ${borders("50%")}
  background: white;

  .qm-radio-button-dot {
    ${absCenter()}
    ${size("85%")}
  }
`

export const StyledRadioButtonLabel = styled.label`
  ${vertMiddleInner()}
`
