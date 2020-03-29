import styled, { css } from "styled-components"

export const StyledCounterBarSpan = styled.span`
  display: block;
  position: relative;
  height: 0.33em;
  background: rgba(0,0,0,0.1);
`

export interface StyledFillBarSpanProps {
  width: string
}

export const StyledFillBarSpan = styled.span`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: background .3s ease, width .1s ease;

  ${({ width }: StyledFillBarSpanProps) => css`
    width: ${width};
  `}

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
