import styled from "styled-components"

import { theme } from "../lib/baseStyles"

export const H2Title = styled.h2`
  color: ${theme("confirmButtonTitleColor", "white")};
`

export const DivOptionsWrapper = styled.div`
  .qm-confirm-button-continue {
    margin-right: ${theme("confirmButtonConfirmMargin", "0.5em")};
  }

  .qm-confirm-button-cancel {
    margin-left: ${theme("confirmButtonCancelMargin", "0.5em")};
  }
`