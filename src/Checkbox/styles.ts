import styled, { css } from "styled-components"

import {
  DEFAULT_BORDER,
  DEFAULT_RADIUS,
  DEFAULT_OUTLINE,
  absCenter,
  absFill,
  absLT,
  size,
  theme,
  vertMiddle,
  vertMiddleInner,
} from "../lib/baseStyles"

export const DivCheckboxContainer = styled.div`
  ${theme("checkboxCustom")}
`

export const SpanCheckboxWrapper = styled.span`
  ${vertMiddle()}
  width: ${theme("checkboxSize", "1em")};
  height: ${theme("checkboxSize", "1em")};

  position: relative;
  margin-right: ${theme("checkboxLabelMargin", ".33em")};
`

export const CheckboxNative = styled.input`
  ${absLT("-1000vw", 0)}
  border: 0;
`

interface SpanCheckboxOverlayProps {
  isFocused: boolean
}

export const SpanCheckboxOverlay = styled.span<SpanCheckboxOverlayProps>`
  ${absFill()}
  box-sizing: border-box;
  border: ${theme("checkboxBorder", DEFAULT_BORDER)};
  border-radius: ${theme("checkboxRadius", DEFAULT_RADIUS)};
  background: ${theme("checkboxBgColor", "white")};

  ${({ isFocused }) => isFocused && css`
    box-shadow: ${theme("checkboxOutlineShadow", DEFAULT_OUTLINE)};
  `}

  outline: none !important;

  &.is-checked {
    background: ${theme("checkboxCheckedBgColor", "white")};
  }

  .qm-checkbox-checkmark {
    ${absCenter()}
    ${size("85%")}
  }

  .qm-checkbox-checkmark path {
    fill: ${theme("checkboxCheckColor", "black")};
  }
`

interface LabelForCheckboxProps {
  isDisabled: boolean
}

export const LabelForCheckbox = styled.label<LabelForCheckboxProps>`
  ${vertMiddleInner()}
  ${({ isDisabled }) => isDisabled
    ? css`color: ${theme("checkboxDisabledLabelColor", "#999999")};`
    : css`color: ${theme("checkboxLabelColor", "black")};`
  }

  &.is-checked {
    color: ${theme("checkboxCheckedLabelColor", "black")};
  }
`
