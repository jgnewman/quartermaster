import styled, { css } from "styled-components"

import {
  createThemer,
  DEFAULT_BG,
  DEFAULT_BORDER,
  DEFAULT_OUTLINE,
  DEFAULT_RADIUS,
  vertMiddle,
  vertMiddleInner,
} from "../lib/baseStyles"

const theme = createThemer("button")

interface CommonButtonProps {
  isFocused: boolean
}

const commonStyles = css<CommonButtonProps>`
  ${vertMiddle()}
  box-sizing: border-box;
  border: ${theme("border", DEFAULT_BORDER)};
  border-radius: ${theme("radius", DEFAULT_RADIUS)};

  background: ${theme("bgColor", DEFAULT_BG)};
  padding: ${theme("padding", "0.33em 1em 0.5em")};

  font-weight: ${theme("fontWeight")};
  font-size: ${theme("fontSize")};
  font-family: ${theme("fontFamily", "inherit")};
  font-style: ${theme("fontStyle")};
  line-height: 1em;
  cursor: pointer;

  ${({ isFocused }) => isFocused && css`
    box-shadow: ${theme("outlineShadow", DEFAULT_OUTLINE)};
  `}

  outline: none !important;

  .qm-button-content {
    transition: all .3s ease;
    color: ${theme("contentColor", "black")};
  }

  &:hover {
    border: ${theme("hoverBorder")};
    background: ${theme("hoverBgColor")};
    .qm-button-content { color: ${theme("hoverContentColor", "black")}; }
  }

  &.is-positive {
    border: ${theme("positiveBorder")};
    background: ${theme("positiveBgColor", "green")};
    .qm-button-content { color: ${theme("positiveContentColor", "white")}; }
  }

  &.is-positive:hover {
    border: ${theme("hoverPositiveBorder")};
    background: ${theme("hoverPositiveBgColor")};
    .qm-button-content { color: ${theme("hoverPositiveContentColor")}; }
  }

  &.is-negative {
    border: ${theme("negativeBorder")};
    background: ${theme("negativeBgColor", "red")};
    .qm-button-content { color: ${theme("negativeContentColor", "white")}; }
  }

  &.is-negative:hover {
    border: ${theme("hoverNegativeBorder")};
    background: ${theme("hoverNegativeBgColor")};
    .qm-button-content { color: ${theme("hoverNegativeContentColor")}; }
  }
`


export const AnchorContainer = styled.a<CommonButtonProps>`
  ${commonStyles}
  ${theme("custom")}
`

export const ButtonContainer = styled.button<CommonButtonProps>`
  ${commonStyles}
  ${theme("custom")}
`

export const SpanButtonContent = styled.span`
  ${vertMiddleInner()}
`
