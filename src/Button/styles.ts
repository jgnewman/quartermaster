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

  font-weight: ${theme("buttonFontWeight")};
  font-size: ${theme("buttonFontSize")};
  font-family: ${theme("buttonFontFamily", "inherit")};
  font-style: ${theme("buttonFontStyle")};
  line-height: 1em;
  cursor: pointer;

  &:hover {
    background: ${theme("buttonHoverBgColor")};
  }
`

export const AnchorContainer = styled.a`
  ${commonStyles}
  ${theme("buttonCustom")}
`

export const ButtonContainer = styled.button`
  ${commonStyles}
  ${theme("buttonCustom")}
`

export const SpanButtonContent = styled.span`
  ${vertMiddleInner()}
  color: ${theme("buttonContentColor", "black")};
`
