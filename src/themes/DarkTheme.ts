import {
  ThemeProps,
  DefaultTheme,
  extendTheme,
} from "../ThemeProvider"

export const COLORS = {
  BASE_FONT: "#aaaaaa",
  BRIGHT_FONT: "#ffffff",
  CHAR_BEST: "#47ae26",
  CHAR_BETTER: "#BEE371",
  CHAR_DECENT: "#FEED78",
  CHAR_WORSE: "#FDAB64",
  CHAR_WORST: "#cf2e41",
  DARK: "#222222",
  DARKER: "#111111",
  DARKEST: "#000000",
  ERRORS: "#f7364c", // for errors
  LIGHTER: "#333333",
  LIGHTEST: "#444444",
  NEGATIVE_HOVER: "#f2384e",
  NEGATIVE: "#cf2e41",
  ON_INDICATORS: "#47ae26",
  OUTLINES: "#3c97ff",
  POSITIVE_HOVER: "#55cb2f",
  POSITIVE: "#47ae26",
  SELECTIONS: "#3c97ff",
  TRANSPARENCY: "transparent",
}

const Theme: ThemeProps = extendTheme(DefaultTheme, {

  avatar: {
    height: "40px",
    indicatorBorder: `2px solid ${COLORS.DARK}`,
    indicatorOffColor: COLORS.BASE_FONT,
    indicatorOnColor: COLORS.ON_INDICATORS,
    radius: "50%",
    width: "40px",
  },

  button: {
    bgColor: COLORS.LIGHTER,
    hoverBgColor: COLORS.LIGHTEST,
    hoverContentColor: COLORS.BRIGHT_FONT,
    hoverNegativeBgColor: COLORS.NEGATIVE_HOVER,
    hoverPositiveBgColor: COLORS.POSITIVE_HOVER,
    border: "none",
    contentColor: COLORS.BRIGHT_FONT,
    fontSize: "75%",
    negativeBgColor: COLORS.NEGATIVE,
    outlineShadow: `0 0 0 2px ${COLORS.OUTLINES}`,
    padding: "0.85em 2em 0.95em",
    positiveBgColor: COLORS.POSITIVE,
    radius: "10em",
    custom: `
      letter-spacing: 3px;
      text-transform: uppercase;
      transition: all .3s ease;
    `,
  },

  charLimitCounter: {
    barBgBest: COLORS.CHAR_BEST,
    barBgBetter: COLORS.CHAR_BETTER,
    barBgDecent: COLORS.CHAR_DECENT,
    barBgEmpty: COLORS.LIGHTER,
    barBgError: COLORS.ERRORS,
    barBgWorse: COLORS.CHAR_WORSE,
    barBgWorst: COLORS.CHAR_WORST,
    barHeight: "2px",
    errTextColor: COLORS.ERRORS,
    fontSize: "75%",
  },

  checkbox: {
    bgColor: COLORS.LIGHTEST,
    border: "none",
    checkColor: COLORS.ON_INDICATORS,
    checkedLabelColor: COLORS.BRIGHT_FONT,
    checkedBgColor: COLORS.LIGHTEST,
    disabledLabelColor: COLORS.LIGHTEST,
    labelColor: COLORS.BASE_FONT,
    outlineShadow: `0 0 0 2px ${COLORS.OUTLINES}`,
    custom: `
      .qm-checkbox-label {
        transition: all .3s ease;
      }

      &:not(.is-disabled):hover .qm-checkbox-label {
        color: ${COLORS.BRIGHT_FONT};
      }
    `,
  },

  modal: {
    bgColor: COLORS.DARKER,
  },

  radioButton: {
    bgColor: COLORS.LIGHTEST,
    border: "none",
    checkedBgColor: COLORS.LIGHTEST,
    checkedLabelColor: COLORS.BRIGHT_FONT,
    disabledLabelColor: COLORS.LIGHTEST,
    dotColor: COLORS.SELECTIONS,
    labelColor: COLORS.BASE_FONT,
    outlineShadow: `0 0 0 2px ${COLORS.OUTLINES}`,
    custom: `
      .qm-radio-button-label {
        transition: all .3s ease;
      }

      &:not(.is-disabled):hover .qm-radio-button-label {
        color: ${COLORS.BRIGHT_FONT};
      }
    `,
  },

  select: {
    bgColor: COLORS.DARKER,
    border: "none",
    caretIconColor: COLORS.LIGHTEST,
    caretIconHoverColor: COLORS.BRIGHT_FONT,
    caretPadding: ".657em",
    clearBgColor: COLORS.TRANSPARENCY,
    clearIconColor: COLORS.LIGHTEST,
    clearIconHoverColor: COLORS.NEGATIVE,
    clearPadding: "0.5em 0.75em",
    color: COLORS.BRIGHT_FONT,
    disabledPlaceholderColor: COLORS.LIGHTER,
    fieldPadding: "0 0 0 0.75em",
    labelColor: COLORS.BRIGHT_FONT,
    labelFontSize: "75%",
    labelPadding: "0 0 .33em 0",
    menuBgColor: COLORS.LIGHTER,
    menuBorder: "none",
    menuRadius: "0.25em",
    menuShadow: "0 2px 15px rgba(0,0,0,0.2)",
    optionColor: COLORS.BASE_FONT,
    optionHoverBgColor: COLORS.LIGHTEST,
    optionHoverColor: COLORS.BRIGHT_FONT,
    optionPadding: "0.25em 0.75em 0.5em",
    optionSelectedBgColor: COLORS.SELECTIONS,
    optionSelectedColor: COLORS.BRIGHT_FONT,
    outlineShadow: `0 0 0 2px ${COLORS.OUTLINES}`,
    radius: "0.25em",
    custom: `
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
  },

  textField: {
    bgColor: COLORS.DARKER,
    border: "none",
    clOffset: "3px", // should include a unit and is usually the same width as your border
    color: COLORS.BRIGHT_FONT,
    disabledPlaceholderColor: COLORS.LIGHTER,
    errColor: COLORS.ERRORS,
    errFontSize: "75%",
    errPadding: "0.15em 0 0.33em",
    height: "35px",
    labelColor: COLORS.BRIGHT_FONT,
    labelFontSize: "75%",
    labelPadding: "0 0 .33em 0",
    outlineShadow: `0 0 0 2px ${COLORS.OUTLINES}`,
    paddingBottom: "",
    paddingBottomCL: "", // text field with char limit
    paddingLeft: "0.75em",
    radius: "0.25em",
    taHeight: "100px",
    taPaddingBottomCL: "1.25em", // text area with char limit
    taPaddingTop: "0.5em",
    custom: `
      .qm-text-field-label {
        letter-spacing: 3px;
        text-transform: uppercase;
      }

      .qm-char-limit-counter-text {
        padding-right: 0.5em;
      }
    `,
  },

})

export default Theme

