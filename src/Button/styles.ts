import styled, { css } from "styled-components"

import {
  DEFAULT_BG,
  DEFAULT_RADIUS,
  DEFAULT_BORDER,
  DEFAULT_OUTLINE,
  theme,
  vertMiddle,
  vertMiddleInner,
} from "../lib/baseStyles"

interface CommonButtonProps {
  isFocused: boolean
}

const commonStyles = css<CommonButtonProps>`
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

  ${({ isFocused }) => isFocused && css`
    box-shadow: ${theme("buttonOutlineShadow", DEFAULT_OUTLINE)};
  `}

  outline: none !important;

  .qm-button-content {
    transition: all .3s ease;
    color: ${theme("buttonContentColor", "black")};
  }

  &:hover {
    border: ${theme("buttonHoverBorder")};
    background: ${theme("buttonHoverBgColor")};
    .qm-button-content { color: ${theme("buttonHoverContentColor", "black")}; }
  }

  &.is-positive {
    border: ${theme("buttonPositiveBorder")};
    background: ${theme("buttonPositiveBgColor", "green")};
    .qm-button-content { color: ${theme("buttonPositiveContentColor", "white")}; }
  }

  &.is-positive:hover {
    border: ${theme("buttonHoverPositiveBorder")};
    background: ${theme("buttonHoverPositiveBgColor")};
    .qm-button-content { color: ${theme("buttonHoverPositiveContentColor")}; }
  }

  &.is-negative {
    border: ${theme("buttonNegativeBorder")};
    background: ${theme("buttonNegativeBgColor", "red")};
    .qm-button-content { color: ${theme("buttonNegativeContentColor", "white")}; }
  }

  &.is-negative:hover {
    border: ${theme("buttonHoverNegativeBorder")};
    background: ${theme("buttonHoverNegativeBgColor")};
    .qm-button-content { color: ${theme("buttonHoverNegativeContentColor")}; }
  }
`


export const AnchorContainer = styled.a<CommonButtonProps>`
  ${commonStyles}
  ${theme("buttonCustom")}
`

export const ButtonContainer = styled.button<CommonButtonProps>`
  ${commonStyles}
  ${theme("buttonCustom")}
`

export const SpanButtonContent = styled.span`
  ${vertMiddleInner()}
`
