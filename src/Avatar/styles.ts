import styled from "styled-components"

import {
  absFill,
  absRB,
  circle,
  coverBg,
  size,
  vertMiddleInner,
} from "../lib/baseStyles"

export const StyledAvatarSpan = styled.span`
  ${circle("inline-block")}
  ${size("40px")}
  ${vertMiddleInner()}

  position: relative;
  overflow: visible;
`

export const StyledAvatarContentSpan = styled.span`
  ${absFill()}
  ${circle()}
  ${coverBg()}

  overflow: hidden;

  svg {
    ${size("100%")}
    display: block;
  }
`

export interface StyledActivitySpanProps {
  isActive: boolean
}

export const StyledActivitySpan = styled.span`
  ${absRB("-1px", "-1px")}
  ${size("12px")}
  ${circle()}

  z-index: 2;
  border: 2px solid white;
  box-sizing: border-box;
  background: gray;

  ${({ isActive }: StyledActivitySpanProps) => isActive && `
    background: limegreen;
  `}
`
