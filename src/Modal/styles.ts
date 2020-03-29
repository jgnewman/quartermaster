import styled, { css } from "styled-components"

export interface SyledModalDivProps {
  isOpen: boolean
}

export const StyledModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;

  background: rgba(0, 0, 0, .93);
  transform: scale(0);
  opacity: 0;
  transition: opacity .3s ease, transform 1s ease;

  ${({ isOpen }: SyledModalDivProps) => isOpen && css`
    transition: transform .3s ease, opacity .5s ease;
    transform: scale(1);
    opacity: 1;
  `}
`

export const StyledModalContentDiv = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  max-width: 100%;

  text-align: center;
  text-transform: none;
  letter-spacing: 0;
`

export const StyledCloseButton = styled.button`
  padding: 1em 1.25em;
  background: transparent;
  border: 0;

  display: block;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;

  &:hover {
    cursor: pointer;
  }

  svg {
    display: block;
    transition: all .3s ease;
  }

  &:hover svg {
    transform: scale(1.25);
  }
`
