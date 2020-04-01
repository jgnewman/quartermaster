import styled, { css } from "styled-components"

import {
  DEFAULT_BORDER,
  absCenter,
  absFill,
  absLT,
  circle,
  theme,
  vertMiddle,
  vertMiddleInner,
} from "../lib/baseStyles"

export const StyledRadioButtonContainer = styled.div`
  ${theme("radioButtonCustom")}
`

export const StyledRadioButtonWrapperSpan = styled.span`
  ${vertMiddle()}
  width: ${theme("radioButtonSize", "1em")};
  height: ${theme("radioButtonSize", "1em")};

  position: relative;
  margin-right: ${theme("radioButtonLabelMargin", ".33em")};
  overlay: hidden;
`

export const StyledRadioButton = styled.input`
  ${absLT("-200%", "-200%")}
  border: 0;
`

export const StyledRadioButtonOverlaySpan = styled.span`
  ${absFill()}
  ${circle()}
  box-sizing: border-box;
  border: ${theme("radioButtonBorder", DEFAULT_BORDER)};
  background: ${theme("radioButtonBgColor", "white")};

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

interface StyledRadioButtonLabelProps {
  isDisabled: boolean
}

export const StyledRadioButtonLabel = styled.label<StyledRadioButtonLabelProps>`
  ${vertMiddleInner()}
  ${({ isDisabled }) => isDisabled
    ? css`color: ${theme("radioButtonDisabledLabelColor", "#999999")};`
    : css`color: ${theme("radioButtonLabelColor", "black")};`
  }

  &.is-checked {
    color: ${theme("radioButtonCheckedLabelColor", "black")};
  }
`
