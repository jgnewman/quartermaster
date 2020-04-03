import styled, { css } from "styled-components"

import {
  DEFAULT_BORDER,
  DEFAULT_BG,
  DEFAULT_RADIUS,
  DEFAULT_OUTLINE,
  absLT,
  createThemer,
  ellipsisText,
  fixRT,
  flex,
  size,
} from "../lib/baseStyles"

const theme = createThemer("select")

export const DivSelectContainer = styled.div`
  ${theme("custom")}
`

export const LabelForSelect = styled.label`
  display: block;
  color: ${theme("labelColor")};
  font-size: ${theme("labelFontSize")};
  font-weight: ${theme("labelFontWeight")};
  padding: ${theme("labelPadding")};
`

export const DivSelectContentWrapper = styled.div`
  display: block;
  position: relative;
  overflow: visible;
  line-height: 1;
`

interface DivFauxSelectWrapperProps {
  isFocused: boolean
}

export const DivFauxSelectWrapper = styled.div<DivFauxSelectWrapperProps>`
  ${flex()}
  background: ${theme("bgColor", "white")};
  box-sizing: border-box;
  border: ${theme("border", DEFAULT_BORDER)};
  border-radius: ${theme("radius", DEFAULT_RADIUS)};
  overflow: hidden;

  ${({ isFocused }) => isFocused && css`
    box-shadow: ${theme("outlineShadow", DEFAULT_OUTLINE)};
  `}

  .qm-select-icon {
    display: block;
  }
`

interface DivClearButtonWrapperProps {
  isDisabled: boolean
}

export const DivClearButtonWrapper = styled.div<DivClearButtonWrapperProps>`
  display: block;
  align-self: center;
  background: ${theme("clearBgColor", "transparent")};

  .qm-clear-button {
    display: block;
    border: 0;
    padding: ${theme("clearPadding", "5px")};
    background: ${theme("clearBgColor", "transparent")};
  }

  .qm-clear-button path {
    fill: ${theme("clearIconColor")};
    transition: all .3s ease;
  }

  ${({ isDisabled }) => !isDisabled && css`
    .qm-clear-button:hover path {
      fill: ${theme("clearIconHoverColor")};
    }
  `}
`

interface DivCaretWrapperProps {
  isDisabled: boolean
}

export const DivCaretWrapper = styled.div<DivCaretWrapperProps>`
  display: block;
  align-self: center;
  padding: ${theme("caretPadding", "5px")};
  background: ${theme("caretBgColor", "transparent")};

  .qm-select-icon path {
    fill: ${theme("caretIconColor")};
    transition: all .3s ease;
  }

  ${({ isDisabled }) => !isDisabled && css`
    &:hover .qm-select-icon path {
      fill: ${theme("caretIconHoverColor")};
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
      return css`color: ${theme("disabledPlaceholderColor", "#999999")};`
    } else if (isDisabled || isShowingPlaceholder) {
      return css`color: ${theme("placeholderColor", "#777777")};`
    } else {
      return css`color: ${theme("color")};`
    }
  }}
`

export const SpanValueField = styled.span`
  ${absLT("auto", "50%")}
  ${ellipsisText()}
  transform: translateY(-50%);
  max-width: 100%;
  padding: ${theme("fieldPadding")};
`

export const SelectNative = styled.select`
  ${fixRT("-1000vw", "auto")}
  ${size("1px")}
  overflow: hidden;
  outline: none !important;
`

export const DivOptionsMenu = styled.div`
  ${absLT(0, "calc(100% + 0.25em)")}
  ${size("100%", "auto")}
  overflow: hidden;
  box-sizing: border-box;
  border: ${theme("menuBorder", DEFAULT_BORDER)};
  border-radius: ${theme("menuRadius", DEFAULT_RADIUS)};
  background: ${theme("menuBgColor", "white")};
  box-shadow: ${theme("menuShadow", "0 0 5px rgba(0,0,0,0.2)")};
`

export const SpanMenuOption = styled.span`
  display: block;
  background: ${theme("optionBgColor")};
  color: ${theme("optionColor")};
  padding: ${theme("optionPadding")};
  transition: all .3s ease;

  &.is-selected {
    background: ${theme("optionSelectedBgColor")};
    color: ${theme("optionSelectedColor")};
  }

  &:hover, &.is-selected:hover {
    background: ${theme("optionHoverBgColor", DEFAULT_BG)};
    color: ${theme("optionHoverColor")};
  }
`
