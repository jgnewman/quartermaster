import styled from "styled-components"

import {
  absLT,
  size,
} from "../lib/baseStyles"

export const StyledWrapperDiv = styled.div`
  &.worst, &.error {
    color: red;
  }
`

export const StyledCounterBarSpan = styled.span`
  ${size("auto", "0.33em")}
  display: block;
  position: relative;
  background: rgba(0,0,0,0.1);
`

export interface StyledFillBarSpanProps {
  width: string
}

export const StyledFillBarSpan = styled.span`
  ${absLT()}

  ${({ width }: StyledFillBarSpanProps) => size(width, "100%")}

  transition: background .3s ease, width .1s ease;

  &.empty {
    background: transparent;
  }

  &.worst {
    background: red;
  }

  &.worse {
    background: orange;
  }

  &.decent {
    background: gold;
  }

  &.better {
    background: yellowgreen;
  }

  &.best {
    background: limegreen;
  }

  &.error {
    background: red;
  }
`
