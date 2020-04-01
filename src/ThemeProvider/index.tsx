export { ThemeProvider as default } from "styled-components"

export interface ThemeProps {

  // Avatar
  avatarBorder?: string
  avatarCustom?: string
  avatarHeight?: string
  avatarIndicatorOffColor?: string
  avatarIndicatorOnColor?: string
  avatarRadius?: string
  avatarWidth?: string

  // Button
  buttonBgColor?: string
  buttonBorder?: string
  buttonContentColor?: string
  buttonCustom?: string
  buttonPadding?: string
  buttonRadius?: string

  // CharLimitCounter
  charLimitBarBgBest?: string
  charLimitBarBgBetter?: string
  charLimitBarBgDecent?: string
  charLimitBarBgEmpty?: string
  charLimitBarBgError?: string
  charLimitBarBgWorse?: string
  charLimitBarBgWorst?: string
  charLimitBarHeight?: string
  charLimitCustom?: string
  charLimitErrTextColor?: string

  // Checkbox
  checkboxBgColor?: string
  checkboxBorder?: string
  checkboxCheckColor?: string
  checkboxCheckedLabelColor?: string
  checkboxCheckedBgColor?: string
  checkboxCustom?: string
  checkboxLabelColor?: string
  checkboxLabelMargin?: string
  checkboxRadius?: string
  checkboxSize?: string

  // ConfirmButton
  confirmButtonCancelMargin?: string
  confirmButtonConfirmMargin?: string
  confirmButtonTitleColor?: string

  // Modal
  modalBgColor?: string
  modalCustom?: string

  // RadioButton
  radioButtonBgColor?: string
  radioButtonBorder?: string
  radioButtonCheckedBgColor?: string
  radioButtonCheckedLabelColor?: string
  radioButtonCustom?: string
  radioButtonDotColor?: string
  radioButtonDotSize?: string
  radioButtonLabelColor?: string
  radioButtonLabelMargin?: string
  radioButtonSize?: string

  // Select
  selectBorder?: string
  selectCaretBgColor?: string
  selectCaretIconColor?: string
  selectCaretPadding?: string
  selectClearBgColor?: string
  selectClearIconColor?: string
  selectClearPadding?: string
  selectColor?: string
  selectCustom?: string
  selectDisabledPlaceholderColor?: string
  selectLabelColor?: string
  selectMenuBgColor?: string
  selectMenuBorder?: string
  selectMenuRadius?: string
  selectMenuShadow?: string
  selectOptionBgColor?: string
  selectOptionColor?: string
  selectOptionHoverBgColor?: string
  selectOptionHoverColor?: string
  selectOptionPadding?: string
  selectOptionSelectedBgColor?: string
  selectOptionSelectedColor?: string
  selectPlaceholderColor?: string
  selectRadius?: string

  // TextField
  textFieldBorder?: string
  textFieldCLOffset?: string // should be the same width as your border
  textFieldColor?: string
  textFieldCustom?: string
  textFieldErrColor?: string
  textFieldHeight?: string
  textFieldPaddingBottom?: string
  textFieldPaddingBottomCL?: string // text field with char limit
  textFieldPaddingBottomTACL?: string // text area with char limit
  textFieldPaddingLeft?: string
  textFieldPaddingRight?: string
  textFieldPaddingTop?: string
  textFieldRadius?: string
}
