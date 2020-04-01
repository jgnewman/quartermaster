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

export const DivSelectContainer = styled.div`
  ${theme("selectCustom")}
`

export const LabelForSelect = styled.label`
  display: block;
  color: ${theme("selectLabelColor")};
  font-size: ${theme("selectLabelFontSize")};
  padding: ${theme("selectLabelPadding")};
`

export const DivSelectContentWrapper = styled.div`
  display: block;
  position: relative;
  overflow: visible;
  line-height: 1;
`

export const DivFauxSelectWrapper = styled.div`
  ${flex()}
  background: ${theme("selectBgColor", "white")};
  box-sizing: border-box;
  border: ${theme("selectBorder", DEFAULT_BORDER)};
  border-radius: ${theme("selectRadius", DEFAULT_RADIUS)};
  overflow: hidden;
`

interface DivClearButtonWrapperProps {
  isDisabled: boolean
}

export const DivClearButtonWrapper = styled.div<DivClearButtonWrapperProps>`
  display: block;
  align-self: center;
  background: ${theme("selectClearBgColor", "transparent")};

  .qm-clear-button {
    display: block;
    border: 0;
    padding: ${theme("selectClearPadding", "5px")};
    background: ${theme("selectClearBgColor", "transparent")};
  }

  .qm-clear-button path {
    fill: ${theme("selectClearIconColor")};
    transition: all .3s ease;
  }

  ${({ isDisabled }) => !isDisabled && css`
    .qm-clear-button:hover path {
      fill: ${theme("selectClearIconHoverColor")};
    }
  `}
`

interface DivCaretWrapperProps {
  isDisabled: boolean
}

export const DivCaretWrapper = styled.div<DivCaretWrapperProps>`
  display: block;
  align-self: center;
  padding: ${theme("selectCaretPadding", "5px")};
  background: ${theme("selectCaretBgColor", "transparent")};

  .qm-select-icon path {
    fill: ${theme("selectCaretIconColor")};
    transition: all .3s ease;
  }

  ${({ isDisabled }) => !isDisabled && css`
    &:hover .qm-select-icon path {
      fill: ${theme("selectCaretIconHoverColor")};
    }
  `}
`

interface DivValueDisplayProps {
  isShowingPlaceholder: boolean
  isDisabled: boolean
}

export const DivValueDisplay = styled.div<DivValueDisplayProps>`
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

export const SpanValueField = styled.span`
  ${absLT("auto", "50%")}
  ${ellipsisText()}
  transform: translateY(-50%);
  max-width: 100%;
  padding: ${theme("selectFieldPadding")};
`

export const SelectNative = styled.select`
  ${fixRT("-1000vw", "auto")}
  ${size("1px")}
  overflow: hidden;
`

export const DivOptionsMenu = styled.div`
  ${absLT(0, "calc(100% + 0.25em)")}
  ${size("100%", "auto")}
  overflow: hidden;
  box-sizing: border-box;
  border: ${theme("selectMenuBorder", DEFAULT_BORDER)};
  border-radius: ${theme("selectMenuRadius", DEFAULT_RADIUS)};
  background: ${theme("selectMenuBgColor", "white")};
  box-shadow: ${theme("selectMenuShadow", "0 0 5px rgba(0,0,0,0.2)")};
`

export const SpanMenuOption = styled.span`
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
