import styled from "styled-components"

import {
  absLT,
  size,
  theme,
} from "../lib/baseStyles"

export const DivCounterContainer = styled.div`
  font-size: ${theme("charLimitFontSize")};
  &.worst, &.error {
    color: ${theme("charLimitErrTextColor", "red")};
  }
  ${theme("charLimitCustom")}
`

export const SpanFillBarWrapper = styled.span`
  width: "auto";
  height: ${theme("charLimitBarHeight", "0.33em")};
  display: block;
  position: relative;
  background: ${theme("charLimitBarBgEmpty", "rgba(0,0,0,0.1)")};
  overflow: hidden;
`

export interface SpanFillBarProps {
  width: string
}

export const SpanFillBar = styled.span<SpanFillBarProps>`
  ${absLT()}
  ${({ width }) => size(width, "100%")}
  transition: background .3s ease, width .1s ease;
  &.empty {
    background: transparent;
  }
  &.worst {
    background: ${theme("charLimitBarBgWorst", "red")};
  }
  &.worse {
    background: ${theme("charLimitBarBgWorse", "orange")};
  }
  &.decent {
    background: ${theme("charLimitBarBgDecent", "gold")};
  }
  &.better {
    background: ${theme("charLimitBarBgBetter", "yellowgreen")};
  }
  &.best {
    background: ${theme("charLimitBarBgBest", "limegreen")};
  }
  &.error {
    background: ${theme("charLimitBarBgError", "red")};
  }
`
