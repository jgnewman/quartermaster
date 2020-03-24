import styled, { css } from "styled-components"

export const StyledAvatarSpan = styled.span`
  display: inline-block;
  border-radius: 50%;
  position: relative;
  overflow: visible;

  width: 40px;
  height: 40px;
`

export const StyledAvatarContentSpan = styled.span`
  display: block;
  postition: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  border-radius: 50%;
  background: #efefef;
  background-size: cover;
  background-position: center center;
  overflow: hidden;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`

export interface StyledActivitySpanProps {
  className: string
  isActive: boolean
}

export const StyledActivitySpan = styled.span`
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;

  width: 10px;
  height: 10px;

  background: gray;
  border-radius: 50%;

  ${(props: StyledActivitySpanProps) => props.isActive && css`
    background: green;
  `}
`
