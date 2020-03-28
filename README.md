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
import Avatar from "quartermaster/lib/Avatar"
```

The benefit of the second approach is that unused components will always be excluded from your bundle without having to enable any kind of unused-code stripping.

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
  children?: ReactNode | ReactNodeArray
  className?: string
  clickHandler?: React.MouseEventHandler
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

### ConfirmButton
Behaves similarly to `Button` but intercepts the click handler with a confirmation modal allowing the user to confirm or cancel the action taken before firing the initial click handler. If the action is canceled, the click handler is not fired and the modal is closed. You can specify the confirmation text as well as the text on both the confirm or cancel buttons, all of which have defaults.

```typescript
interface ConfirmButtonProps extends ButtonProps {
  cancelText?: string
  confirmationText?: string
  continueText?: string
  postCancelHook?: React.MouseEventHandler
}
```

#### Todo
- Bypass displaying confirmation

### Modal
Takes an `isOpen` prop that determines whether or not the modal should be open. Also takes a `closeHandler` function that fires when the modal's close button is clicked. Note that the modal does not close itself. You must determine when to change the `isOpen` after the close handler is fired. Nested content will appear inside the modal.

```typescript
interface ModalProps {
  children?: ReactNode | ReactNodeArray
  className?: string
  closeHandler?: React.MouseEventHandler
  hideCloseButton?: boolean // defaults to false
  isOpen: boolean
}
```

### TextField
Generates an input field or textarea as specified by props. Allows capturing the field ref via a function such as `elem => this.myRef = elem`. Takes both a `changeHandler` and a `keyUpHandler` that you can use to capture new values and capture things like enter key presses. Allows enabling character limits, setting a label and placeholder, marking the field as disabled, and displaying error text.

```typescript
interface TextFieldProps {
  changeHandler?: React.ChangeEventHandler
  charLimit?: number // Enables a CharLimitCounter component on the field
  charLimitIsMinimum?: boolean
  children?: ReactNode | ReactNodeArray
  className?: string
  dangerouslyAutoTruncateLimitBreakingValues?: boolean
  defaultValue?: string
  disabled?: boolean
  enableTextAreaResize?: boolean
  errorText?: string
  fieldRef?: (elem: HTMLElement | null) => void
  hideCharLimitProgress?: boolean
  hideCharLimitText?: boolean
  id?: string
  ignoreLastPass?: boolean
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

## General Todos
- Create some default CSS values for styled-components
- Create new components (forms and fields)
- Pick correct real deps and peer deps (ex: react, styled-components)
