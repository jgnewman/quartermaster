import {
  ThemeProps,
  DefaultTheme,
  extendTheme,
} from "../ThemeProvider"

export const COLORS = {
  BASE_FONT: "#333333",
  LIGHT_FONT: "#ffffff",
  FADED_FONT: "#bdbdbd",
  BASE_BG: "#ffffff",
  DARK_BG: "rgba(0,0,0,0.85)",
  LIGHT_BG: "rgba(0,0,0,0.1)",
  BASE_BORDER: "1px solid rgba(0,0,0,0.25)",
  HIGHLIGHT: "#3C97FF",
  LIGHT_HIGHLIGHT: "#68afff",
  CHAR_BEST: "#52c02c",
  CHAR_BETTER: "#9cd426",
  CHAR_DECENT: "#fde017",
  CHAR_WORSE: "#FDAB64",
  CHAR_WORST: "#cf2e41",
  ERRORS: "#f7364c",
  ON_INDICATORS: "#52c02c",
  POSITIVE_HOVER: "#72d44f",
  POSITIVE: "#52c02c",
  OUTLINES: "#3c97ff",
  NEGATIVE_HOVER: "#f2384e",
  NEGATIVE: "#cf2e41",
  TRANSPARENCY: "transparent",
  SELECTIONS: "#3c97ff",
}

const Theme: ThemeProps = extendTheme(DefaultTheme, {

  avatar: {
    height: "40px",
    indicatorBorder: `2px solid ${COLORS.BASE_BG}`,
    indicatorOffColor: COLORS.BASE_FONT,
    indicatorOnColor: COLORS.ON_INDICATORS,
    radius: "50%",
    width: "40px",
  },

  button: {
    bgColor: COLORS.HIGHLIGHT,
    hoverBgColor: COLORS.LIGHT_HIGHLIGHT,
    hoverContentColor: COLORS.LIGHT_FONT,
    hoverNegativeBgColor: COLORS.NEGATIVE_HOVER,
    hoverPositiveBgColor: COLORS.POSITIVE_HOVER,
    border: "none",
    contentColor: COLORS.LIGHT_FONT,
    fontWeight: "bold",
    negativeBgColor: COLORS.NEGATIVE,
    outlineShadow: `0 0 0 2px ${COLORS.OUTLINES}`,
    padding: "0.55em 1.5em 0.75em",
    positiveBgColor: COLORS.POSITIVE,
    radius: "10em",
    custom: `
      transition: all .3s ease;
    `,
  },

  charLimitCounter: {
    barBgBest: COLORS.CHAR_BEST,
    barBgBetter: COLORS.CHAR_BETTER,
    barBgDecent: COLORS.CHAR_DECENT,
    barBgEmpty: COLORS.LIGHT_BG,
    barBgError: COLORS.ERRORS,
    barBgWorse: COLORS.CHAR_WORSE,
    barBgWorst: COLORS.CHAR_WORST,
    barHeight: "5px",
    color: COLORS.BASE_FONT,
    errTextColor: COLORS.ERRORS,
    fontSize: "85%",
  },

  checkbox: {
    bgColor: COLORS.BASE_BG,
    border: COLORS.BASE_BORDER,
    checkColor: COLORS.ON_INDICATORS,
    checkedLabelColor: COLORS.BASE_FONT,
    checkedBgColor: COLORS.LIGHT_FONT,
    disabledLabelColor: COLORS.FADED_FONT,
    labelColor: COLORS.BASE_FONT,
    outlineShadow: `0 0 0 2px ${COLORS.OUTLINES}`,
    custom: `
      .qm-checkbox-label {
        transition: all .3s ease;
      }

      &:not(.is-disabled) .qm-checkbox-faux-wrapper:hover .qm-checkbox-label {
        color: ${COLORS.HIGHLIGHT};
      }
    `,
  },

  modal: {
    bgColor: COLORS.DARK_BG,
  },

  radioButton: {
    bgColor: COLORS.BASE_BG,
    border: COLORS.BASE_BORDER,
    checkedBgColor: COLORS.BASE_BG,
    checkedLabelColor: COLORS.BASE_FONT,
    disabledLabelColor: COLORS.FADED_FONT,
    dotColor: COLORS.HIGHLIGHT,
    labelColor: COLORS.BASE_FONT,
    outlineShadow: `0 0 0 2px ${COLORS.OUTLINES}`,
    custom: `
      .qm-radio-button-label {
        transition: all .3s ease;
      }

      &:not(.is-disabled) .qm-radio-button-faux-wrapper:hover .qm-radio-button-label {
        color: ${COLORS.HIGHLIGHT};
      }
    `,
  },

  select: {
    bgColor: COLORS.BASE_BG,
    border: COLORS.BASE_BORDER,
    caretIconColor: COLORS.FADED_FONT,
    caretIconHoverColor: COLORS.HIGHLIGHT,
    caretPadding: "0.813em 0.66em",
    clearBgColor: COLORS.TRANSPARENCY,
    clearIconColor: COLORS.FADED_FONT,
    clearIconHoverColor: COLORS.NEGATIVE,
    clearPadding: "0.5em 0.75em",
    color: COLORS.BASE_FONT,
    disabledPlaceholderColor: COLORS.FADED_FONT,
    fieldPadding: "0 0 0 0.75em",
    labelColor: COLORS.BASE_FONT,
    labelFontWeight: "bold",
    labelPadding: "0 0 .33em 0",
    menuBgColor: COLORS.BASE_BG,
    menuBorder: COLORS.BASE_BORDER,
    menuRadius: "0.25em",
    menuShadow: "0 2px 15px rgba(0,0,0,0.2)",
    optionColor: COLORS.BASE_FONT,
    optionHoverBgColor: COLORS.LIGHT_BG,
    optionHoverColor: COLORS.BASE_FONT,
    optionPadding: "0.5em 0.75em 0.66em",
    optionSelectedBgColor: COLORS.SELECTIONS,
    optionSelectedColor: COLORS.LIGHT_FONT,
    outlineShadow: `0 0 0 2px ${COLORS.OUTLINES}`,
    radius: "0.25em",
    custom: `
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
        background: ${COLORS.FADED_FONT};
      }
    `,
  },

  textField: {
    bgColor: COLORS.BASE_BG,
    border: COLORS.BASE_BORDER,
    clOffset: "0px", // should include a unit and is usually the same width as your border
    color: COLORS.BASE_FONT,
    disabledPlaceholderColor: COLORS.FADED_FONT,
    errColor: COLORS.ERRORS,
    errFontSize: "75%",
    errPadding: "0.15em 0 0.33em",
    height: "40px",
    labelColor: COLORS.BASE_FONT,
    labelFontWeight: "bold",
    labelPadding: "0 0 .33em 0",
    outlineShadow: `0 0 0 2px ${COLORS.OUTLINES}`,
    paddingBottom: "",
    paddingBottomCL: "", // text field with char limit
    paddingLeft: "0.75em",
    paddingTop: "0.1em",
    radius: "0.25em",
    taHeight: "100px",
    taPaddingBottomCL: "1.5em", // text area with char limit
    taPaddingTop: "0.66em",
    custom: `
      .qm-char-limit-counter-text {
        padding-right: 0.5em;
      }
    `,
  },

})

export default Theme

