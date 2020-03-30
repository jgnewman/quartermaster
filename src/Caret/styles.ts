import styled from "styled-components"

export const StyledWrapperSpan = styled.span`
  position: relative;
  display: block;
  height: 1em;
  width: 1em;
  transform: rotate(135deg);
`

export const StyledLeftSpan = styled.span`
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translate(-50%, 0.1em);
  width: 0.2em;
  height: 100%;
  background: black;
`

export const StyledRightSpan = styled.span`
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(0.1em, 50%);
  width: 100%;
  height: 0.2em;
  background: black;
`