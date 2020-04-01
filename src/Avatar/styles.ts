import styled, { css } from "styled-components"

import {
  absFill,
  absRB,
  circle,
  coverBg,
  size,
  theme,
  vertMiddle,
} from "../lib/baseStyles"

export const SpanAvatarContainer = styled.span`
  ${vertMiddle()}
  width: ${theme("avatarWidth", "40px")};
  height: ${theme("avatarHeight", "40px")};
  border: ${theme("avatarBorder")};
  box-sizing: border-box;
  border-radius: ${theme("avatarRadius", "50%")};

  position: relative;
  overflow: visible;
  ${theme("avatarCustom")}
`

export const SpanAvatarContent = styled.span`
  ${absFill()}
  ${coverBg()}
  border-radius: ${theme("avatarRadius", "50%")};
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
  background: ${theme("avatarIndicatorOffColor", "gray")};
  border: ${theme("avatarIndicatorBorder")};

  ${({ isActive }) => isActive && css`
    background: ${theme("avatarIndicatorOnColor", "limegreen")};
  `}
`
