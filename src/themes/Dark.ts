const DARK_GRAY = "#333333"
const DARKER_GRAY = "#282828"
const DARKEST_GRAY = "#202020"

const LIGHT_GRAY = "#505050"
const LIGHTER_GRAY = "#595959"
const LIGHTEST_GRAY = "#BDBDBD"

const TRANSPARENCY = "transparent"
const LIGHT_TRANSPARENCY = "rgba(255, 255, 255, 0.15)"

const WHITE = "#FFFFFF"
const HIGHLIGHT = "#3C97FF"

export default {
  "background": {
    [DARK_GRAY]: "body",

    [DARKER_GRAY]: `
      .qmCheckboxOverlay,
      .qmMenuContainer,
      .qmRadioOverlay,
      .qmSelectClickableWrapper,
      .qmTextFieldInputWrapper,
      .qmToggleOverlay
    `,

    [DARKEST_GRAY]: `
      .qmIconButtonEffect,
      .qmSelectMenu,
      .qmSelectMenuOption
    `,

    [LIGHT_GRAY]: ".qmAvatarInitials",
    [LIGHTER_GRAY]: "qmSelectOpenIconWrapper::before",
    [LIGHTEST_GRAY]: ".qmToggleSlider",
    [TRANSPARENCY]: ".qmCharLimitBar",
    [WHITE]: ".qmToggleSlider.isChecked",
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
  },

  "border-color": {
    [DARK_GRAY]: ".qmAvatarIndicator",
    [LIGHT_TRANSPARENCY]: ".qmSpinnerContainer",
  },

  "border-top-color": {
    [HIGHLIGHT]: ".qmSpinnerContainer",
  },

  "border-radius": {
    "0.25rem": ".qmCharLimitBar",
  },

  "box-shadow": {
    [`0 0 0 3px ${DARK_GRAY}`]: ".qmAvatarContainer",
  },

  "color": {
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
      body,
      .qmCharLimitText,
      .qmCheckboxLabel,
      .qmMenuLink,
      .qmRadioLabel,
      .qmSelectMenuOption,
      .qmToggleLabel
    `,

    [WHITE]: `
      .qmLabelContainer,
      .qmSelectDisplay,
      .qmTextFieldInput.isField,
      .qmTextFieldInput.isTextArea
    `,
  },

  "fill": {
    [LIGHTER_GRAY]: `
      .qmSelectOpenIcon .qmIcon,
      .qmSelectClearIcon .qmIcon
    `,

    [WHITE]: ".qmIcon",
  },

  "height": {
    "101%": `
      .qmCharLimitBar,
      .qmCharLimitBar.isCompact
    `,
  },

  "opacity": {
    "0.2": ".qmCharLimitBarFill",
    "0.33": ".qmSelectOpenIconWrapper::before",

    "0.5": `
      .qmSelectOpenIconWrapper.isDisabled,
      .qmSelectClearIconWrapper.isDisabled
    `,
  },
}
