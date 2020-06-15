const DARK_GRAY = "#333333"
const DARKER_GRAY = "#282828"
const DARKEST_GRAY = "#202020"

const LIGHT_GRAY = "#505050"
const LIGHTER_GRAY = "#595959"
const LIGHTEST_GRAY = "#BDBDBD"

const TRANSPARENCY = "transparent"
const WHITE_FADE_FLY = "rgba(255, 255, 255, 0.1)"
const WHITE_FADE_BANTAM = "rgba(255, 255, 255, 0.15)"
const BLACK_FADE_FEATHER = "rgba(0, 0, 0, 0.2)"
const BLACK_FADE_LIGHT = "rgba(0, 0, 0, 0.25)"

const WHITE = "#FFFFFF"
const HIGHLIGHTS = "#3C97FF"
const RED = "#f7364c"

export default {
  "background": {
    [DARK_GRAY]: "body",

    [DARKER_GRAY]: `
      .qmCheckboxOverlay,
      .qmRadioOverlay,
      .qmSelectClickableWrapper,
      .qmTextFieldInputWrapper,
      .qmToggleOverlay
    `,

    [DARKEST_GRAY]: `
      .qmIconButtonEffect,
      .qmMenuContainer,
      .qmSelectMenu,
      .qmSelectMenuOption,
      .qmToastContent
    `,

    [BLACK_FADE_LIGHT]: `
      .qmMenuLink:hover,
      .qmMenuSubmenuLink.isCollapsible:hover,
    `,

    [LIGHT_GRAY]: ".qmAvatarInitials",
    [LIGHTER_GRAY]: ".qmSelectOpenIconWrapper::before",
    [LIGHTEST_GRAY]: ".qmToggleSlider",
    [TRANSPARENCY]: ".qmCharLimitBar",
    [WHITE]: ".qmToggleSlider.isChecked",
    [WHITE_FADE_FLY]: ".qmToastClearButton .qmIconButtonEffect",

  },

  "border": {
    "0" : `
      .qmCheckboxOverlay,
      .qmRadioOverlay,
      .qmSelectClickableWrapper,
      .qmSelectMenu,
      .qmTextFieldInput.isField,
      .qmTextFieldInput.isTextArea,
      .qmToggleOverlay
    `,

    [`1px solid ${WHITE_FADE_FLY}`]: ".qmToastContent",
  },

  "border-color": {
    [BLACK_FADE_FEATHER]: ".qmMenuSeparator",
    [DARK_GRAY]: ".qmAvatarIndicator",
    [WHITE_FADE_BANTAM]: ".qmSpinnerContainer",
  },

  "border-top-color": {
    [HIGHLIGHTS]: ".qmSpinnerContainer",
  },

  "border-radius": {
    "0.25rem": ".qmCharLimitBar",
  },

  "box-shadow": {
    [`0 3px 15px ${BLACK_FADE_LIGHT}`]: ".qmMenuContainer.isLifted",
    [`0 0 0 3px ${DARK_GRAY}`]: ".qmAvatarContainer",

  },

  "color": {
    [RED]: ".qmTextContainer.qmLabelRequired",

    [LIGHT_GRAY]: `
      .qmCharLimitContainer.isDisabled .qmCharLimitText
      .qmSelectDisplay.isDisabled,
      .qmSelectDisplay.isDisabled.isPlaceholder,
      .qmTextFieldInput.isField.isDisabled,
      .qmTextFieldInput.isField.isDisabled::placeholder,
      .qmTextFieldInput.isTextArea.isDisabled,
      .qmTextFieldInput.isTextArea.isDisabled::placeholder
    `,

    [LIGHTEST_GRAY]: `
      .qmCharLimitText,
      .qmCheckboxLabel,
      .qmMenuLink,
      .qmMenuSubmenuLink,
      .qmRadioLabel,
      .qmSelectMenuOption,
      .qmTextContainer,
      .qmToggleLabel
    `,

    [WHITE]: `
      .qmButtonContent,
      .qmHeading,
      .qmLabelContainer,
      .qmSelectDisplay,
      .qmTextFieldInput.isField,
      .qmTextFieldInput.isTextArea
    `,
  },

  "fill": {
    [LIGHTER_GRAY]: ".qmIcon.qmMenuSubmenuIcon",
    [WHITE]: ".qmPathIsFilled",
  },

  "height": {
    "101%": `
      .qmCharLimitBar,
      .qmCharLimitBar.isCompact
    `,
  },

  "stroke": {
    [LIGHTER_GRAY]: `
      .qmIcon.qmSelectOpenIcon,
      .qmIcon.qmSelectClearIcon
    `,

    [WHITE]: ".qmIcon",
  },

  "opacity": {
    "0.2": ".qmCharLimitBarFill",

    "0.5": `
      .qmSelectOpenIconWrapper.isDisabled,
      .qmSelectClearIconWrapper.isDisabled
    `,
  },
}
