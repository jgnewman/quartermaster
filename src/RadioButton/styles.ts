import styled, { css } from "styled-components"

import {
  DEFAULT_BORDER,
  DEFAULT_OUTLINE,
  absCenter,
  absFill,
  absLT,
  circle,
  theme,
  vertMiddle,
  vertMiddleInner,
} from "../lib/baseStyles"

export const DivRadioButtonContainer = styled.div`
  ${theme("radioButtonCustom")}
`

export const SpanRadioButtonWrapper = styled.span`
  ${vertMiddle()}
  width: ${theme("radioButtonSize", "1em")};
  height: ${theme("radioButtonSize", "1em")};

  position: relative;
  margin-right: ${theme("radioButtonLabelMargin", ".33em")};
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
  border: ${theme("radioButtonBorder", DEFAULT_BORDER)};
  background: ${theme("radioButtonBgColor", "white")};

  ${({ isFocused }) => isFocused && css`
    box-shadow: ${theme("radioButtonOutlineShadow", DEFAULT_OUTLINE)};
  `}

  outline: none !important;

  &.is-checked {
    background: ${theme("radioButtonCheckedBgColor", "white")};
  }

  .qm-radio-button-dot {
    ${absCenter()}
    width: ${theme("radioButtonDotSize", "85%")};
    height: ${theme("radioButtonDotSize", "85%")};
  }

  .qm-radio-button-dot circle {
    fill: ${theme("radioButtonDotColor", "black")};
  }
`

interface LabelForRadioButtonProps {
  isDisabled: boolean
}

export const LabelForRadioButton = styled.label<LabelForRadioButtonProps>`
  ${vertMiddleInner()}
  ${({ isDisabled }) => isDisabled
    ? css`color: ${theme("radioButtonDisabledLabelColor", "#999999")};`
    : css`color: ${theme("radioButtonLabelColor", "black")};`
  }

  &.is-checked {
    color: ${theme("radioButtonCheckedLabelColor", "black")};
  }
`
