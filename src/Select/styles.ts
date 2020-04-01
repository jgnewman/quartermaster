import styled, { css } from "styled-components"

import {
  DEFAULT_BORDER,
  DEFAULT_BG,
  DEFAULT_RADIUS,
  absLT,
  ellipsisText,
  fixRT,
  flex,
  size,
  theme,
} from "../lib/baseStyles"

export const StyledSelectContainer = styled.div`
  ${theme("selectCustom")}
`

export const StyledSelectLabel = styled.label`
  display: block;
  color: ${theme("selectLabelColor")};
`

export const StyledSelectWrapperDiv = styled.div`
  display: block;
  position: relative;
  overflow: visible;
`

export const StyledInputWrapperDiv = styled.div`
  ${flex()}
  box-sizing: border-box;
  border: ${theme("selectBorder", DEFAULT_BORDER)};
  border-radius: ${theme("selectRadius", DEFAULT_RADIUS)};

  .qm-select-icon {
    display: block;
    align-self: center;
    padding: ${theme("selectCaretPadding", "5px")};
    background: ${theme("selectCaretBgColor", "transparent")};
  }

  .qm-select-icon path {
    fill: ${theme("selectCaretIconColor")};
  }

  .qm-clear-button {
    padding: ${theme("selectClearPadding", 0)};
    border: 0;
    background: ${theme("selectClearBgColor", "transparent")};
  }

  .qm-clear-button path {
    fill: ${theme("selectClearIconColor")};
  }
`

interface StyledDisplayProps {
  isShowingPlaceholder: boolean
  isDisabled: boolean
}

export const StyledDisplayDiv = styled.div<StyledDisplayProps>`
  flex-grow: 1;
  position: relative;
  overflow: hidden;

  ${({ isDisabled, isShowingPlaceholder }) => {
    if (isDisabled && isShowingPlaceholder) {
      return css`color: ${theme("selectDisabledPlaceholderColor", "#999999")};`
    } else if (isDisabled || isShowingPlaceholder) {
      return css`color: ${theme("selectPlaceholderColor", "#777777")};`
    } else {
      return css`color: ${theme("selectColor")};`
    }
  }}
`

export const StyledDisplaySpan = styled.span`
  ${absLT("auto", "50%")}
  ${ellipsisText()}
  transform: translateY(-50%);
  max-width: 100%;
`

export const StyledSelect = styled.select`
  ${fixRT("-1000vw", "auto")}
  ${size("1px")}
  overflow: hidden;
`

export const StyledMenu = styled.div`
  ${absLT(0, "calc(100% + 0.25em)")}
  ${size("100%", "auto")}
  box-sizing: border-box;
  border: ${theme("selectMenuBorder", DEFAULT_BORDER)};
  border-radius: ${theme("selectMenuRadius", DEFAULT_RADIUS)};
  background: ${theme("selectMenuBgColor", "white")};
  box-shadow: ${theme("selectMenuShadow", "0 0 5px rgba(0,0,0,0.2)")};
`

export const StyledMenuOption = styled.span`
  display: block;
  background: ${theme("selectOptionBgColor")};
  color: ${theme("selectOptionColor")};
  padding: ${theme("selectOptionPadding")};
  transition: all .3s ease;

  &.is-selected {
    background: ${theme("selectOptionSelectedBgColor")};
    color: ${theme("selectOptionSelectedColor")};
  }

  &:hover, &.is-selected:hover {
    background: ${theme("selectOptionHoverBgColor", DEFAULT_BG)};
    color: ${theme("selectOptionHoverColor")};
  }
`
