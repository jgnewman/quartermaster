import styled from "styled-components"

import { createThemer } from "../lib/baseStyles"
const theme = createThemer("confirmButton")

export const H2Title = styled.h2`
  color: ${theme("titleColor", "white")};
`

export const DivOptionsWrapper = styled.div`
  .qm-confirm-button-continue {
    margin-right: ${theme("confirmMargin", "0.5em")};
  }

  .qm-confirm-button-cancel {
    margin-left: ${theme("cancelMargin", "0.5em")};
  }
`
