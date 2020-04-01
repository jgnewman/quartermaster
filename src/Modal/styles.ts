import styled from "styled-components"

import {
  absLT,
  fixFill,
  fixRT,
  theme,
} from "../lib/baseStyles"

export interface SyledModalDivProps {
  isOpen: boolean
}

export const DivModalContainer = styled.div<SyledModalDivProps>`
  ${fixFill()}
  z-index: 9999;
  background: ${theme("modalBgColor", "rgba(0,0,0,0.93)")};
  transform: scale(0);
  opacity: 0;
  transition: opacity .3s ease, transform 1s ease;

  ${({ isOpen }) => isOpen && `
    transition: transform .3s ease, opacity .5s ease;
    transform: scale(1);
    opacity: 1;
  `}

  ${theme("modalCustom")};
`

export const DivModalContent = styled.div`
  ${absLT("50%", "40%")}
  transform: translateX(-50%) translateY(-50%);
  max-width: 100%;

  text-align: center;
  text-transform: none;
  letter-spacing: 0;
`

export const ButtonClose = styled.button`
  ${fixRT()}
  z-index: 9999;
  padding: 1em 1.25em;
  background: transparent;
  border: 0;

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
