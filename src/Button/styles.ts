import styled, { css } from "styled-components"

import {
  DEFAULT_BG,
  DEFAULT_RADIUS,
  DEFAULT_BORDER,
  theme,
  vertMiddle,
  vertMiddleInner,
} from "../lib/baseStyles"

const commonStyles = css`
  ${vertMiddle()}
  box-sizing: border-box;
  border: ${theme("buttonBorder", DEFAULT_BORDER)};
  border-radius: ${theme("buttonRadius", DEFAULT_RADIUS)};

  background: ${theme("buttonBgColor", DEFAULT_BG)};
  padding: ${theme("buttonPadding", "0.33em 1em 0.5em")};

  line-height: 1em;
  cursor: pointer;
`

export const StyledAnchor = styled.a`
  ${commonStyles}
  ${theme("buttonCustom")}
`

export const StyledButton = styled.button`
  ${commonStyles}
  ${theme("buttonCustom")}
`

export const StyledButtonContentSpan = styled.span`
  ${vertMiddleInner()}
  color: ${theme("buttonContentColor", "black")};
`
