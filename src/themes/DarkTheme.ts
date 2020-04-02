import type { ThemeProps } from "../ThemeProvider"

const COLORS = {
  AQUAMARINE: "#4BE3A2",
  BASE_FONT: "#aaaaaa",
  BLUE: "#3c97ff",
  LIGHTEST: "#444444",
  LIGHTER: "#333333",
  DARK: "#222222",
  DARKER: "#111111",
  DARKEST: "#000000",
  DEEP_RED: "#f7364c", // for errors
  GREEN: "#47ae26",
  GREEN_HOVER: "#55cb2f",
  LIME: "#BEE371",
  ORANGE: "#FDAB64",
  OUTLINE: "#1657a0",
  RED: "#cf2e41",
  RED_HOVER: "#f2384e",
  TRANSPARENT: "transparent",
  WHITE: "#ffffff",
  YELLOW: "#FEED78",
}

const Theme: ThemeProps = {
  // Avatar
  avatarHeight: "40px",
  avatarIndicatorBorder: `2px solid ${COLORS.DARK}`,
  avatarIndicatorOffColor: COLORS.BASE_FONT,
  avatarIndicatorOnColor: COLORS.GREEN,
  avatarRadius: "50%",
  avatarWidth: "40px",

  // Button
  buttonBgColor: COLORS.LIGHTER,
  buttonHoverBgColor: COLORS.LIGHTEST,
  buttonHoverContentColor: COLORS.WHITE,
  buttonHoverNegativeBgColor: COLORS.RED_HOVER,
  buttonHoverPositiveBgColor: COLORS.GREEN_HOVER,
  buttonBorder: "none",
  buttonContentColor: COLORS.WHITE,
  buttonFontSize: "75%",
  buttonNegativeBgColor: COLORS.RED,
  buttonOutlineShadow: `0 0 0 2px ${COLORS.BLUE}`,
  buttonPadding: "0.85em 2em 0.95em",
  buttonPositiveBgColor: COLORS.GREEN,
  buttonRadius: "10em",
  buttonCustom: `
    letter-spacing: 3px;
    text-transform: uppercase;
    transition: all .3s ease;
  `,

  // CharLimitCounter
  charLimitBarBgBest: COLORS.GREEN,
  charLimitBarBgBetter: COLORS.LIME,
  charLimitBarBgDecent: COLORS.YELLOW,
  charLimitBarBgEmpty: COLORS.LIGHTER,
  charLimitBarBgError: COLORS.DEEP_RED,
  charLimitBarBgWorse: COLORS.ORANGE,
  charLimitBarBgWorst: COLORS.RED,
  charLimitBarHeight: "2px",
  charLimitErrTextColor: COLORS.DEEP_RED,
  charLimitFontSize: "75%",

  // Checkbox
  checkboxBgColor: COLORS.LIGHTEST,
  checkboxBorder: "none",
  checkboxCheckColor: COLORS.GREEN,
  checkboxCheckedLabelColor: COLORS.WHITE,
  checkboxCheckedBgColor: COLORS.LIGHTEST,
  checkboxDisabledLabelColor: COLORS.LIGHTEST,
  checkboxLabelColor: COLORS.BASE_FONT,
  checkboxOutlineShadow: `0 0 0 2px ${COLORS.BLUE}`,
  checkboxCustom: `
    .qm-checkbox-label {
      transition: all .3s ease;
    }

    &:not(.is-disabled):hover .qm-checkbox-label {
      color: ${COLORS.WHITE};
    }
  `,

  // ConfirmButton


  // Modal
  modalBgColor: COLORS.DARKER,

  // RadioButton
  radioButtonBgColor: COLORS.LIGHTEST,
  radioButtonBorder: "none",
  radioButtonCheckedBgColor: COLORS.LIGHTEST,
  radioButtonCheckedLabelColor: COLORS.WHITE,
  radioButtonDisabledLabelColor: COLORS.LIGHTEST,
  radioButtonDotColor: COLORS.BLUE,
  radioButtonLabelColor: COLORS.BASE_FONT,
  radioButtonOutlineShadow: `0 0 0 2px ${COLORS.BLUE}`,
  radioButtonCustom: `
    .qm-radio-button-label {
      transition: all .3s ease;
    }

    &:not(.is-disabled):hover .qm-radio-button-label {
      color: ${COLORS.WHITE};
    }
  `,

  // Select
  selectBgColor: COLORS.DARKER,
  selectBorder: "none",
  selectCaretIconColor: COLORS.LIGHTEST,
  selectCaretIconHoverColor: COLORS.WHITE,
  selectCaretPadding: ".657em",
  selectClearBgColor: COLORS.TRANSPARENT,
  selectClearIconColor: COLORS.LIGHTEST,
  selectClearIconHoverColor: COLORS.RED,
  selectClearPadding: "0.5em 0.75em",
  selectColor: COLORS.WHITE,
  selectDisabledPlaceholderColor: COLORS.LIGHTER,
  selectFieldPadding: "0 0 0 0.75em",
  selectLabelColor: COLORS.WHITE,
  selectLabelFontSize: "75%",
  selectLabelPadding: "0 0 .33em 0",
  selectMenuBgColor: COLORS.LIGHTER,
  selectMenuBorder: "none",
  selectMenuRadius: "0.25em",
  selectMenuShadow: "0 2px 15px rgba(0,0,0,0.2)",
  selectOptionColor: COLORS.BASE_FONT,
  selectOptionHoverBgColor: COLORS.LIGHTEST,
  selectOptionHoverColor: COLORS.WHITE,
  selectOptionPadding: "0.25em 0.75em 0.5em",
  selectOptionSelectedBgColor: COLORS.BLUE,
  selectOptionSelectedColor: COLORS.WHITE,
  selectOutlineShadow: `0 0 0 2px ${COLORS.BLUE}`,
  selectRadius: "0.25em",
  selectCustom: `
    .qm-select-label {
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    .qm-clear-button {
      transform: translateX(-0.25em);
    }

    .qm-open-icon-wrapper {
      position: relative;
    }

    .qm-open-icon-wrapper::before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 50%;
      width: 1px;
      height: 50%;
      transform: translateY(-50%);
      background: ${COLORS.LIGHTER};
    }
  `,

  // TextField
  textFieldBgColor: COLORS.DARKER,
  textFieldBorder: "none",
  textFieldCLOffset: "3px", // should include a unit and is usually the same width as your border
  textFieldColor: COLORS.WHITE,
  textFieldDisabledPlaceholderColor: COLORS.LIGHTER,
  textFieldErrColor: COLORS.DEEP_RED,
  textFieldErrFontSize: "75%",
  textFieldErrPadding: "0.15em 0 0.33em",
  textFieldHeight: "35px",
  textFieldLabelColor: COLORS.WHITE,
  textFieldLabelFontSize: "75%",
  textFieldLabelPadding: "0 0 .33em 0",
  textFieldOutlineShadow: `0 0 0 2px ${COLORS.BLUE}`,
  textFieldPaddingBottom: "",
  textFieldPaddingBottomCL: "", // text field with char limit
  textFieldPaddingLeft: "0.75em",
  textFieldRadius: "0.25em",
  textFieldTAHeight: "100px",
  textFieldTAPaddingBottomCL: "1.25em", // text area with char limit
  textFieldTAPaddingTop: "0.5em",
  textFieldCustom: `
    .qm-text-field-label {
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    .qm-char-limit-counter-text {
      padding-right: 0.5em;
    }
  `,
}

export default Theme

// TODO
// - Can we organize/modularize theme chunks?
