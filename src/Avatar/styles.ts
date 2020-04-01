import styled, { css } from "styled-components"

import {
  DEFAULT_BORDER,
  absFill,
  absRB,
  circle,
  coverBg,
  size,
  theme,
  vertMiddle,
} from "../lib/baseStyles"

export const StyledAvatarSpan = styled.span`
  ${vertMiddle()}
  width: ${theme("avatarWidth", "40px")};
  height: ${theme("avatarHeight", "40px")};
  border: ${theme("avatarBorder", DEFAULT_BORDER)};
  box-sizing: border-box;
  border-radius: ${theme("avatarRadius", "50%")};

  position: relative;
  overflow: visible;
  ${theme("avatarCustom")}
`

export const StyledAvatarContentSpan = styled.span`
  ${absFill()}
  ${coverBg()}
  border-radius: ${theme("avatarRadius", "50%")};
  overflow: hidden;

  svg {
    ${size("100%")}
    display: block;
  }
`

export interface StyledActivitySpanProps {
  isActive: boolean
}

export const StyledActivitySpan = styled.span<StyledActivitySpanProps>`
  ${absRB("-1px", "-1px")}
  ${size("12px")}
  ${circle()}

  z-index: 2;
  box-sizing: border-box;
  background: ${theme("avatarIndicatorOffColor", "gray")};

  ${({ isActive }) => isActive && css`
    background: limegreen;
  `}
`
