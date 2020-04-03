# quartermaster
A shared React component library. Read the [contributing guide](https://github.com/jgnewman/quartermaster/blob/master/CONTRIBUTING.md) to pitch in!

## Installation
Currently quartermaster is private, not published on npm so installation should be done via `npm install jgnewman/quartermaster#<RELEASE_BRANCH>` where `RELEASE_BRANCH` matches an existing release tag such as `v0.0.1`. It will currently fail for anyone without read access to the repository.

Note that quartermaster does not have any dependencies but it does require two peer dependencies namely React and styled-components. This allows your app to determine the proper versions of these packages, thus allowing you to avoid duplicates.

## How to use
Quartermaster is written in ES6+ and includes .d.ts files for typescript. You can either import all components from a single file...

```javascript
import { Avatar } from "quartermaster"
```

...or import individual components as needed...

```javascript
import Avatar from "quartermaster/Avatar"
```

The benefit of the second approach is that unused components will always be excluded from your bundle without having to enable any kind of unused-code stripping.

## Theming
By default, you can import any Quartermaster component and drop it into your application anywhere and it will work. However, it will only have very minimal styling applied. Fortunately, Quartermaster is themeable and comes with a built-in Light theme and Dark theme that you can apply. You can also create new themes and extend existing themes as desired.

To apply one of the built-in themes, you will want wrap your application in the `ThemeProvider` and specify the theme you want to use.

```jsx
import { ThemeProvider } from "quartermaster"
// or import ThemeProvider from "quartermaster/ThemeProvider"

import DarkTheme from "quartermaster/themes/DarkTheme"
import App from "path/to/app"

ReactDOM.render(
  <ThemeProvider theme={DarkTheme}>
    <App/>
  </ThemeProvider>
, document.body)
```

Having done this, every Quartermaster component you use within your app will have your theme styles applied.

### Creating and extending themes
Generating new themes is done with the `extendTheme` function. To see a list of all available theme options, take a look at the `ThemeProps` interface within `src/ThemeProvider/index.tsx`.

```jsx
import { ThemeProvider, extendTheme } from "quartermaster"
// or import ThemeProvider, { extendTheme } from "quartermaster/ThemeProvider"

import DarkTheme from "quartermaster/themes/DarkTheme"

const MyTheme = extendTheme(DarkTheme, {
  button: {
    bgColor: "#000000",
    hoverBgColor: "#111111",
  },
})

ReactDOM.render(
  <ThemeProvider theme={MyTheme}>
    <App/>
  </ThemeProvider>
, document.body)
```

If you want to create a new theme fully from scratch, you'll simply want to extend the default theme.

```jsx
import { ThemeProvider, DefaultTheme, extendTheme } from "quartermaster"
// or import ThemeProvider, { DefaultTheme, extendTheme } from "quartermaster/ThemeProvider"

const MyTheme = extendTheme(DefaultTheme, {
  avatar: {
    radius: "3px",
  },
})

ReactDOM.render(
  <ThemeProvider theme={MyTheme}>
    <App/>
  </ThemeProvider>
, document.body)
```

## What's included

### Avatar
Creates a circular avatar allowing you to pass in a url to the avatar image. If no url is present, it falls back to a default image. Includes an optional "activity" indicator that can be displayed to indicate when the user is active/online/etc.

```typescript
interface AvatarProps {
  className?: string
  isActive?: boolean
  showActivity?: boolean
  url?: string
}
```

#### Todo
- custom sizes

### Button
Creates a button from either an `a` tag or a `button` tag as specified, defaulting to `button`. Receives classes based on props indicating if the button is disabled or "processing" (for example while you are waiting for an action to complete). Takes a click handler that fires when the button is clicked.

```typescript
interface ButtonProps {
  className?: string
  clickHandler?: React.MouseEventHandler
  highlight?: "positive" | "negative" // applies additional green or red color stylings
  isDisabled?: boolean
  isProcessing?: boolean
  tag?: "a" | "button" // defaults to button
  text?: string // can be used instead of children to display button text
}
```

#### Todo
- custom sizes
- specify rounded corners maybe

### CharLimitCounter
Displays a counter in relation to a limit, for example `22 / 25` as well as a colored progress bar indicating how close the counter is coming to the limit. This component is most commonly enabled automatically via props passed to the TextField component, but is available for use independently.

```typescript
interface CharLimitCounterProps {
  className?: string
  count: number
  hideProgressBar?: boolean
  hideText?: boolean
  limit: number
  limitIsMinimum?: boolean // indicates that the count should be greater than limit
  suffix?: string // a unit to append to limit, for example "px"
}
```

### Checkbox
Creates a stylable checkbox element wrapped around native checkbox input for optimized accessibility. Allows specifying a label, a `isChecked` state, and a `value` among other features. Allows capturing the checkbox ref via a function such as `elem => this.myRef = elem`.

```typescript
interface CheckboxProps {
  changeHandler?: React.ChangeEventHandler
  checkboxRef?: (elem: HTMLElement | null) => void
  className?: string
  groupName?: string
  id?: string
  isChecked: boolean
  isDisabled?: boolean
  label?: string
  tabIndex?: number
  value?: string
}
```

### ConfirmButton
Behaves similarly to `Button` but intercepts the click handler with a confirmation modal allowing the user to confirm or cancel the action taken before firing the initial click handler. If the action is canceled, the click handler is not fired and the modal is closed. You can specify the confirmation text as well as the text on both the confirm or cancel buttons, all of which have defaults.

```typescript
export interface ConfirmButtonProps extends Exclude<ButtonProps, "highlight"> {
  cancelText?: string
  confirmationText?: string
  continueText?: string
  postCancelHook?: React.MouseEventHandler
  useHighlights?: boolean // automatically applies highlights to buttons
}
```

#### Todo
- Bypass displaying confirmation

### Form
Used for wrapping a group of form-related components and collecting their values into a localized state that can be quickly and easily managed. Takes an `initialState` object specifying each form element's default value and a function as a child component that returns your form elements.

```typescript
interface FormProps {
  children: (utils: FormUtils) => ReactNode | ReactNodeArray
  initialState: SimpleObject
}

// where...

interface FormUtils {
  getFormState: () => any
  setFormState: (vals: SimpleObject) => void
  updateValueFor: (name: string) => (evt: React.ChangeEvent | string | null) => void
  toggleCheckedFor: (name: string) => () => void
}

interface SimpleObject {
  [key: string]: string | number | boolean | null
}
```

Here is an example:

```jsx
<Form initialState={{ myText: "", myBox: false }}>
  {({ getFormState, updateValueFor, toggleCheckedFor }) => (
    <>
      <TextField
        type="text"
        value={getFormState().myText}
        changeHandler={updateValueFor("myText")}
      />
      <Checkbox
        label="Check me"
        isChecked={getFormState().myBox}
        changeHandler={toggleCheckedFor("myBox")}
      />
      <Button clickHandler={() => console.log(getFormState())}>
        Log form data
      </Button>
    </>
  )}
</Form>
```

In addition to the `FormUtils` functions illustrated above, you also have access to a `setFormState` function that you can use to manually update the form state.

```typescript
setFormState({ myText: "some value" })
```

### Modal
Takes an `isOpen` prop that determines whether or not the modal should be open. Also takes a `closeHandler` function that fires when the modal's close button is clicked. Note that the modal does not close itself. You must determine when to change the `isOpen` after the close handler is fired. Nested content will appear inside the modal.

```typescript
interface ModalProps {
  className?: string
  closeHandler?: React.MouseEventHandler
  hideCloseButton?: boolean // defaults to false
  isOpen: boolean
}
```

### RadioButton
Creates a stylable radio button element wrapped around native radio input for optimized accessibility. Allows specifying a label, a `isChecked` state, a `value`, and a radio group name among other features. Allows capturing the radio ref via a function such as `elem => this.myRef = elem`.

```typescript
interface RadioButtonProps {
  changeHandler?: React.ChangeEventHandler
  checkboxRef?: (elem: HTMLElement | null) => void
  className?: string
  groupName?: string
  id?: string
  isChecked: boolean
  isDisabled?: boolean
  label?: string
  tabIndex?: number
  value?: string
}
```

### RadioGroup
Creates a group of radio buttons that can be treated as a single value. Requires a `name` prop for specifying the group name and an array of `options` specifying the label and value for each radio option. It then takes a single `changeHandler` providing access to the event created by the radio button that triggered the change, and is controlled by a single `value` prop.

```typescript
interface RadioGroupProps {
  changeHandler?: React.ChangeEventHandler
  className?: string
  isDisabled?: boolean
  name: string
  options: RadioOption[]
  value: string
}

// where...

interface RadioOption {
  label: string
  value: string
  id?: string
  ref?: RefFunction
  tabIndex?: number
}
```

### Select
Generates a stylable select menu built on top of a raw `select` element for accessibility. Allows capturing the field ref via a function such as `elem => this.myRef = elem`. Is controlled by a `value`, and takes an array of `options` objects and a `changeHandler` for capturing value updates.

```typescript
interface SelectProps {
  changeHandler?: (value: string | null) => void
  className?: string
  fieldRef?: (elem: HTMLElement | null) => void
  id?: string
  isDisabled?: boolean
  label?: string
  options: SelectOption[]
  placeholder?: string
  value: string | null
}

// Where...

interface SelectOption {
  label: string
  value: string
}
```

### TextField
Generates an input field or textarea as specified by props. Allows capturing the field ref via a function such as `elem => this.myRef = elem`. Takes both a `changeHandler` and a `keyUpHandler` that you can use to capture new values and capture things like enter key presses. Allows enabling character limits, setting a label and placeholder, marking the field as disabled, and displaying error text.

```typescript
interface TextFieldProps {
  changeHandler?: React.ChangeEventHandler
  charLimit?: number // Enables a CharLimitCounter component on the field
  charLimitIsMinimum?: boolean
  className?: string
  dangerouslyAutoTruncateLimitBreakingValues?: boolean
  defaultValue?: string
  enableTextAreaResize?: boolean
  errorText?: string
  fieldRef?: (elem: HTMLElement | null) => void
  hideCharLimitProgress?: boolean
  hideCharLimitText?: boolean
  id?: string
  ignoreLastPass?: boolean
  isDisabled?: boolean
  keyUpHandler?: React.KeyboardEventHandler
  label?: string
  placeholder?: string
  preventInputAtLimit?: boolean // Stops firing events once the char limit has been reached
  tabIndex?: number
  type?: string // For example "text" | "tel" | "password"
  value?: string
}
```

With regard to `dangerouslyAutoTruncateLimitBreakingValues`, this prop is rarely ever needed but is applicable in any case where you might attempt to pass a value to the text field that is greater than a provided char limit, assuming the character count is not expected to be greater than the limit. With this prop set to true, the component will automatically truncate the provided value and fire both a `change` and `keyUp` event with the new value. The prop is labeled as dangerous because if you are not handling these events in such a way that the component re-renders with the new, truncated value, you will trigger an infinitely recursive loop.
