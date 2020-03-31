import styled from "styled-components"

import {
  DEFAULT_BG,
  absLT,
  borders,
  ellipsisText,
  fixRT,
  flex,
  size,
} from "../lib/baseStyles"

export const StyledSelectLabel = styled.label`
  display: block;
`

export const StyledSelectWrapperDiv = styled.div`
  display: block;
  position: relative;
  overflow: visible;
`

export const StyledInputWrapperDiv = styled.div`
  ${borders()}
  ${flex()}

  .qm-select-icon {
    display: block;
    align-self: center;
    padding: 5px;
  }

  .qm-clear-button {
    padding: 0;
    border: 0;
    background: transparent;
  }
`

interface StyledDisplayProps {
  isShowingPlaceholder: boolean
  isDisabled: boolean
}

export const StyledDisplayDiv = styled.div`
  flex-grow: 1;
  position: relative;
  overflow: hidden;

  ${({ isDisabled, isShowingPlaceholder }: StyledDisplayProps) => {
    if (isDisabled && isShowingPlaceholder) {
      return "color: #999999"
    } else if (isDisabled || isShowingPlaceholder) {
      return "color: #777777;"
    } else {
      return "color: inherit;"
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
  ${borders()}
  background: white;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
`

export const StyledMenuOption = styled.span`
  display: block;

  &:hover {
    background: ${DEFAULT_BG};
  }
`
