import styled from "styled-components"

import {
  absLT,
  createThemer,
  size,
} from "../lib/baseStyles"

const theme = createThemer("charLimitCounter")

export const DivCounterContainer = styled.div`
  font-size: ${theme("fontSize")};
  &.worst, &.error {
    color: ${theme("errTextColor", "red")};
  }
  ${theme("custom")}
`

export const SpanFillBarWrapper = styled.span`
  width: "auto";
  height: ${theme("barHeight", "0.33em")};
  display: block;
  position: relative;
  background: ${theme("barBgEmpty", "rgba(0,0,0,0.1)")};
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
    background: ${theme("barBgWorst", "red")};
  }
  &.worse {
    background: ${theme("barBgWorse", "orange")};
  }
  &.decent {
    background: ${theme("barBgDecent", "gold")};
  }
  &.better {
    background: ${theme("barBgBetter", "yellowgreen")};
  }
  &.best {
    background: ${theme("barBgBest", "limegreen")};
  }
  &.error {
    background: ${theme("barBgError", "red")};
  }
`
