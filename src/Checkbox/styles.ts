import styled from "styled-components"

import {
  DEFAULT_BORDER,
  DEFAULT_RADIUS,
  absCenter,
  absFill,
  absLT,
  size,
  theme,
  vertMiddle,
  vertMiddleInner,
} from "../lib/baseStyles"

export const StyledCheckboxContainer = styled.div`
  ${theme("checkboxCustom")}
`

export const StyledCheckboxWrapperSpan = styled.span`
  ${vertMiddle()}
  width: ${theme("checkboxSize", "1em")};
  height: ${theme("checkboxSize", "1em")};

  position: relative;
  margin-right: ${theme("checkboxLabelMargin", ".33em")};
  overflow: hidden;
`

export const StyledCheckbox = styled.input`
  ${absLT("-200%", "-200%")}
  border: 0;
`

export const StyledCheckboxOverlaySpan = styled.span`
  ${absFill()}
  box-sizing: border-box;
  border: ${theme("checkboxBorder", DEFAULT_BORDER)};
  border-radius: ${theme("checkboxRadius", DEFAULT_RADIUS)};
  background: ${theme("checkboxBgColor", "white")};

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

export const StyledCheckboxLabel = styled.label`
  ${vertMiddleInner()}
  color: ${theme("checkboxLabelColor", "black")};

  &.is-checked {
    color: ${theme("checkboxCheckedLabelColor", "black")};
  }
`
