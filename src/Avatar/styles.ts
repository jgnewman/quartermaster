import styled, { css } from "styled-components"

import {
  absFill,
  absRB,
  circle,
  coverBg,
  createThemer,
  size,
  vertMiddle,
} from "../lib/baseStyles"

const theme = createThemer("avatar")

export const SpanAvatarContainer = styled.span`
  ${vertMiddle()}
  width: ${theme("width", "40px")};
  height: ${theme("height", "40px")};
  border: ${theme("border")};
  box-sizing: border-box;
  border-radius: ${theme("radius", "50%")};

  position: relative;
  overflow: visible;
  ${theme("custom")}
`

export const SpanAvatarContent = styled.span`
  ${absFill()}
  ${coverBg()}
  border-radius: ${theme("radius", "50%")};
  overflow: hidden;

  svg {
    ${size("100%")}
    display: block;
  }
`

export interface SpanActivityIndicatorProps {
  isActive: boolean
}

export const SpanActivityIndicator = styled.span<SpanActivityIndicatorProps>`
  ${absRB("-1px", "-1px")}
  ${size("12px")}
  ${circle()}

  z-index: 2;
  box-sizing: border-box;
  background: ${theme("indicatorOffColor", "gray")};
  border: ${theme("indicatorBorder")};

  ${({ isActive }) => isActive && css`
    background: ${theme("indicatorOnColor", "limegreen")};
  `}
`
