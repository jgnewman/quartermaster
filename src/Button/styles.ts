import styled from "styled-components"

import {
  DEFAULT_BG,
  borders,
  vertMiddleInner,
} from "../lib/baseStyles"

const commonStyles = `
  ${borders()}
  ${vertMiddleInner()}
  display: inline-block;

  background: ${DEFAULT_BG};
  padding: 0.33em 1em 0.5em;

  line-height: 1em;
  cursor: pointer;
`

export const StyledButtonContentSpan = styled.span`
  ${vertMiddleInner()}
`

export const StyledAnchor = styled.a`
  ${commonStyles}
`

export const StyledButton = styled.button`
  ${commonStyles}
`
