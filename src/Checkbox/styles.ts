import styled, { css } from "styled-components"

import {
  DEFAULT_BORDER,
  DEFAULT_RADIUS,
  DEFAULT_OUTLINE,
  absCenter,
  absFill,
  absLT,
  createThemer,
  size,
  vertMiddle,
  vertMiddleInner,
} from "../lib/baseStyles"

const theme = createThemer("checkbox")

export const DivCheckboxContainer = styled.div`
  ${theme("custom")}
`

export const SpanFauxCheckboxWrapper = styled.span`
  ${vertMiddle()}
`

export const SpanCheckboxWrapper = styled.span`
  ${vertMiddle()}
  width: ${theme("size", "1em")};
  height: ${theme("size", "1em")};

  position: relative;
  margin-right: ${theme("labelMargin", ".33em")};
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
  border: ${theme("border", DEFAULT_BORDER)};
  border-radius: ${theme("radius", DEFAULT_RADIUS)};
  background: ${theme("bgColor", "white")};

  ${({ isFocused }) => isFocused && css`
    box-shadow: ${theme("outlineShadow", DEFAULT_OUTLINE)};
  `}

  outline: none !important;

  &.is-checked {
    background: ${theme("checkedBgColor", "white")};
  }

  .qm-checkbox-checkmark {
    ${absCenter()}
    ${size("85%")}
  }

  .qm-checkbox-checkmark path {
    fill: ${theme("checkColor", "black")};
  }
`

interface LabelForCheckboxProps {
  isDisabled: boolean
}

export const LabelForCheckbox = styled.label<LabelForCheckboxProps>`
  ${vertMiddleInner()}
  ${({ isDisabled }) => isDisabled
    ? css`color: ${theme("disabledLabelColor", "#999999")};`
    : css`color: ${theme("labelColor", "black")};`
  }

  &.is-checked {
    color: ${theme("checkedLabelColor", "black")};
  }
`
