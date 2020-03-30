import styled from "styled-components"

export const StyledWrapperSpan = styled.span`
  position: relative;
  display: block;
  height: 1em;
  width: 1em;
`

export const StyledVerticalSpan = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0.2em;
  height: 100%;
  background: black;
`

export const StyledHorizontalSpan = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 0.2em;
  background: black;
`