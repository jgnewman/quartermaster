import styled, { css } from "styled-components"

import {
  DEFAULT_BORDER,
  DEFAULT_OUTLINE,
  absCenter,
  absFill,
  absLT,
  circle,
  createThemer,
  vertMiddle,
  vertMiddleInner,
} from "../lib/baseStyles"

const theme = createThemer("radioButton")

export const DivRadioButtonContainer = styled.div`
  ${theme("custom")}
`

export const SpanRadioButtonWrapper = styled.span`
  ${vertMiddle()}
  width: ${theme("size", "1em")};
  height: ${theme("size", "1em")};

  position: relative;
  margin-right: ${theme("labelMargin", ".33em")};
`

export const RadioButtonNative = styled.input`
  ${absLT("-1000vw", 0)}
  border: 0;
`

interface SpanRadioButtonOverlayProps {
  isFocused: boolean
}

export const SpanRadioButtonOverlay = styled.span<SpanRadioButtonOverlayProps>`
  ${absFill()}
  ${circle()}
  box-sizing: border-box;
  border: ${theme("border", DEFAULT_BORDER)};
  background: ${theme("bgColor", "white")};

  ${({ isFocused }) => isFocused && css`
    box-shadow: ${theme("outlineShadow", DEFAULT_OUTLINE)};
  `}

  outline: none !important;

  &.is-checked {
    background: ${theme("checkedBgColor", "white")};
  }

  .qm-radio-button-dot {
    ${absCenter()}
    width: ${theme("dotSize", "85%")};
    height: ${theme("dotSize", "85%")};
  }

  .qm-radio-button-dot circle {
    fill: ${theme("dotColor", "black")};
  }
`

interface LabelForRadioButtonProps {
  isDisabled: boolean
}

export const LabelForRadioButton = styled.label<LabelForRadioButtonProps>`
  ${vertMiddleInner()}
  ${({ isDisabled }) => isDisabled
    ? css`color: ${theme("disabledLabelColor", "#999999")};`
    : css`color: ${theme("labelColor", "black")};`
  }

  &.is-checked {
    color: ${theme("checkedLabelColor", "black")};
  }
`
