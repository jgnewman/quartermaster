import styled from "styled-components"

export const StyledWrapperSpan = styled.span`
  position: relative;
  display: block;
  height: 1em;
  width: 1em;
  transform: rotate(45deg);
`

export const StyledLongEdgeSpan = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 0.2em;
  height: 100%;
  background: black;
`

export const StyledShortEdgeSpan = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 66%;
  height: 0.2em;
  background: black;
`