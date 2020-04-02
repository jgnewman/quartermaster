export { ThemeProvider as default } from "styled-components"

export interface ThemeProps {

  // Avatar
  avatarBorder?: string
  avatarCustom?: string
  avatarHeight?: string
  avatarIndicatorBorder?: string
  avatarIndicatorOffColor?: string
  avatarIndicatorOnColor?: string
  avatarRadius?: string
  avatarWidth?: string

  // Button
  buttonBgColor?: string
  buttonBorder?: string
  buttonContentColor?: string
  buttonCustom?: string
  buttonFontWeight?: string
  buttonFontSize?: string
  buttonFontFamily?: string
  buttonFontStyle?: string
  buttonHoverBorder?: string
  buttonHoverBgColor?: string
  buttonHoverContentColor?: string
  buttonHoverNegativeBorder?: string
  buttonHoverNegativeBgColor?: string
  buttonHoverNegativeContentColor?: string
  buttonHoverPositiveBorder?: string
  buttonHoverPositiveBgColor?: string
  buttonHoverPositiveContentColor?: string
  buttonNegativeBorder?: string
  buttonNegativeBgColor?: string
  buttonNegativeContentColor?: string
  buttonOutlineShadow?: string
  buttonPadding?: string
  buttonPositiveBorder?: string
  buttonPositiveBgColor?: string
  buttonPositiveContentColor?: string
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
  charLimitFontSize?: string

  // Checkbox
  checkboxBgColor?: string
  checkboxBorder?: string
  checkboxCheckColor?: string
  checkboxCheckedLabelColor?: string
  checkboxCheckedBgColor?: string
  checkboxCustom?: string
  checkboxDisabledLabelColor?: string
  checkboxLabelColor?: string
  checkboxLabelMargin?: string
  checkboxOutlineShadow?: string
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
  radioButtonDisabledLabelColor?: string
  radioButtonDotColor?: string
  radioButtonDotSize?: string
  radioButtonLabelColor?: string
  radioButtonLabelMargin?: string
  radioButtonOutlineShadow?: string
  radioButtonSize?: string

  // Select
  selectBgColor?: string
  selectBorder?: string
  selectCaretBgColor?: string
  selectCaretIconColor?: string
  selectCaretIconHoverColor?: string
  selectCaretPadding?: string
  selectClearBgColor?: string
  selectClearIconColor?: string
  selectClearIconHoverColor?: string
  selectClearPadding?: string
  selectColor?: string
  selectCustom?: string
  selectDisabledPlaceholderColor?: string
  selectFieldPadding?: string
  selectLabelColor?: string
  selectLabelFontSize?: string
  selectLabelPadding?: string
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
  selectOutlineShadow?: string
  selectPlaceholderColor?: string
  selectRadius?: string

  // TextField
  textFieldBgColor?: string
  textFieldBorder?: string
  textFieldCLOffset?: string // should include a unit and is usually the same width as your border
  textFieldColor?: string
  textFieldCustom?: string
  textFieldDisabledPlaceholderColor?: string
  textFieldErrColor?: string
  textFieldErrFontSize?: string
  textFieldErrPadding?: string
  textFieldHeight?: string
  textFieldLabelColor?: string
  textFieldLabelFontSize?: string
  textFieldLabelPadding?: string
  textFieldOutlineShadow?: string
  textFieldPaddingBottom?: string
  textFieldPaddingBottomCL?: string // text field with char limit
  textFieldPaddingLeft?: string
  textFieldPaddingRight?: string
  textFieldPaddingTop?: string
  textFieldPlaceholderColor?: string
  textFieldRadius?: string
  textFieldTAHeight?: string
  textFieldTAPaddingBottomCL?: string // text area with char limit
  textFieldTAPaddingTop?: string
}
