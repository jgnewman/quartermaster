import styled, { css } from "styled-components"

export const StyledSelectLabel = styled.label`
  display: block;
`

export const StyledSelectWrapperDiv = styled.div`
  display: block;
  position: relative;
  overflow: visible;
`

export const StyledInputWrapperDiv = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  .qm-select-icon {
    display: block;
    align-self: center;
    padding: 5px;
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
      return css`
        color: #999999;
      `
    } else if (isDisabled || isShowingPlaceholder) {
      return css`
        color: #777777;
      `
    } else {
      return css`
        color: inherit;
      `
    }
  }}
`

export const StyledDisplaySpan = styled.span`
  position: absolute;
  top: 50%;
  left: auto;
  transform: translateY(-50%);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`

export const StyledSelect = styled.select`
  display: block;
  position: fixed;
  overflow: hidden;
  height: 1px;
  width: 1px;
  left: 1000vw;
`

export const StyledMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.25em);
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
`

export const StyledMenuOption = styled.span`
  display: block;

  &:hover {
    background: #efefef;
  }
`
