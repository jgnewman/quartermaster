# quartermaster
A shared React component library. Read the [contributing guide](https://github.com/jgnewman/quartermaster/blob/master/CONTRIBUTING.md) to pitch in!

## Installation
Currently quartermaster is private, not published on npm so installation should be done via `npm install jgnewman/quartermaster#<RELEASE_BRANCH>` where `RELEASE_BRANCH` matches an existing release tag such as `v0.0.1`. It will currently fail for anyone without read access to the repository.

Note that quartermaster does not have any dependencies but it does require React as a peer dependency. This allows your app to determine the proper version of React, thus allowing you to avoid duplicates.

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

## Styles
Quartermaster deliberately avoids styled-components for performance and bundle size reasons. Instead, the compiled JavaScript files contain imports of css files so you will need to use Webpack or a similar bundling tool in order to use them.

## What's included

- [Alert](#alert)
- [Align](#align)
- [Animation](#animation)
- [Avatar](#avatar)
- [Button](#button)
- [Checkbox](#checkbox)
- [ConfirmButton](#confirmbutton)
- [Form](#form)
- [Grid](#grid)
- [Grow](#grow)
- [Heading](#heading)
- [Icons](#icons)
- [IconButton](#iconbutton)
- [Label](#label)
- [Menu](#menu)
- [Modal](#modal)
- [Paragraph](#paragraph)
- [RadioButton](#radiobutton)
- [RadioGroup](#radiogroup)
- [Select](#select)
- [Space](#space)
- [Spinner](#spinner)
- [Text](#text)
- [TextField](#textfield)
- [Theme](#theme)
- [Toggle](#toggle)

### Alert
Places a colored box with an alert icon in one of three forms: `info`, `danger`, or `warning`. The content of the alert box can be specified with either `text` or `children`.

```typescript
interface AlertProps {
  children?: React.ReactNode
  className?: string
  text?: string
  type: "danger" | "info" | "warning"
}
```

### Align
For when you need to put two or more elements onto the same horizontal alignment with common spacing. You can specify whether children are justified left, center or right. Additionally, you can apply a measure of spacing to any of the group's 4 sides.

```typescript
interface AlignProps {
  children?: React.ReactNode
  className?: string
  justify?: "left" | "center" | "right"
  bottomSpace?: SpaceSize
  leftSpace?: SpaceSize
  rightSpace?: SpaceSize
  topSpace?: SpaceSize
}

// Where `SpaceSize` is defined in the Space component
```

### Animation
Allows you to fade an element in or out by wrapping it in this component, optionally specifying a direction it moves as it does so. The `duration` prop is specified in milliseconds and is translated into a CSS animation duration. The `override` prop allows you to prevent animation and either show or hide the element. It also allows capturing the animated div ref via a function such as `elem => this.myRef = elem`.

```typescript
interface AnimationProps {
  children?: React.ReactNode
  className?: string
  direction?: "left" | "right" | "up" | "down"
  displayNoneOnHide?: boolean // Removes the element from the DOM flow when hidden
  duration?: number // defaults to 200
  elemRef?: React.Ref<HTMLDivElement> // either a Ref object or a Ref callback
  override?: "hide" | "show" | null
  style?: any
  type: "fadeIn" | "fadeOut"
}
```

### Avatar
Creates a circular avatar allowing you to pass in a url to the avatar image. If no url is present, it falls back to generating initials based on the provided name. If no name is present, it defaults to displaying `••`. Includes an optional "activity" indicator that can be displayed to indicate when the user is active/online/etc. If `isCompact` is true, it will generate a smaller version of the component.

```typescript
interface AvatarProps {
  className?: string
  isActive?: boolean
  isCompact?: true
  name?: string
  showActivity?: boolean
  url?: string
}
```

### Button
Creates a button from either an `a` tag or a `button` tag as specified, defaulting to `button`. Receives classes based on props indicating if the button is disabled or "processing" (for example while you are waiting for an action to complete). Takes a click handler that fires when the button is clicked. If `isCompact` is true, it will generate a smaller version of the component.

```typescript
interface ButtonProps {
  children?: React.ReactNode
  className?: string
  clickHandler?: React.MouseEventHandler
  highlight?: "positive" | "negative" // applies additional green or red color stylings
  href?: string // Only applies if `tag` is "a"
  isCompact?: boolean
  isDisabled?: boolean
  isProcessing?: boolean
  ref?: React.MutableRefObject<HTMLAnchorElement | HTMLButtonElement>
  tag?: "a" | "button" // defaults to button
  text?: string // can be used instead of children to display button text
}
```

### Checkbox
Creates a stylable checkbox element wrapped around native checkbox input for optimized accessibility. Allows specifying a label, a `isChecked` state, and a `value` among other features. Allows capturing the checkbox ref via a function such as `elem => this.myRef = elem`.

```typescript
interface CheckboxProps {
  changeHandler?: React.ChangeEventHandler
  className?: string
  id?: string
  isChecked: boolean
  isDisabled?: boolean
  label?: string
  ref?: React.MutableRefObject<HTMLInputElement>
  tabIndex?: number
  value?: string
}
```

### ConfirmButton
Behaves similarly to `Button` but intercepts the click handler with a confirmation modal allowing the user to confirm or cancel the action taken before firing the initial click handler. If the action is canceled, the click handler is not fired and the modal is closed. You can specify the confirmation text as well as the text on both the confirm or cancel buttons, all of which have defaults. If you don't want to display the confirmation message, for example if you only need confirmation on an action once, you can enable `skipConfirmation` to bypass the confirmation message.

```typescript
export interface ConfirmButtonProps extends Exclude<ButtonProps, "highlight"> {
  cancelText?: string
  confirmationText?: string
  continueText?: string
  disableHighlights?: boolean // disables positive/negative highlights on buttons
  postCancelHook?: React.MouseEventHandler
  skipConfirmation?: boolean
  useCompactModalButtons?: boolean // affects yes/no button size
}
```

### Form
Used for wrapping a group of form-related components and collecting their values into a localized state that can be quickly and easily managed. Takes an `initialState` object specifying each form element's default value and a function as a child component that returns your form elements.

```typescript
interface FormProps {
  children: (utils: FormUtils) => ReactNode | ReactNodeArray
  initialState: SimpleObject
}

// where...

interface FormUtils {
  formState: SimpleObject
  setFormState: (vals: SimpleObject) => void

  // Compatible with Select, TextField
  updateValueFor: (name: string) => (evt: React.ChangeEvent | string | null) => void

  // Compatible with Checkbox, RadioButton, Toggle
  toggleCheckedFor: (name: string) => () => void
}

interface SimpleObject {
  [key: string]: string | number | boolean | null
}
```

Here is an example:

```jsx
<Form initialState={{ myText: "", myBox: false }}>
  {({ formState, updateValueFor, toggleCheckedFor }) => (
    <>
      <TextField
        type="text"
        value={formState.myText}
        changeHandler={updateValueFor("myText")}
      />
      <Checkbox
        label="Check me"
        isChecked={formState.myBox}
        changeHandler={toggleCheckedFor("myBox")}
      />
      <Button clickHandler={() => console.log(formState)}>
        Log form data
      </Button>
    </>
  )}
</Form>
```

Notice that the `FormUtils` here function similarly to React's `useState` hook. In addition to the util functions illustrated above, you also have access to a `setFormState` function that you can use to manually update one or many values on the form state.

```typescript
setFormState({ myText: "some value" })
```

### Grid
Allows you to drop in an easy flexbox grid. The `wrap` property enables flexbox item wrapping and the `justify` property sets the alignment of items within the grid. Items default to `space-between` justification.

```typescript
interface GridProps {
  children?: React.ReactNode
  className?: string
  equalHeight?: boolean
  justify?: "start" | "end" | "center" | "even" | "between" | "around"
  wrap?: boolean
}
```

Here is an example:

```jsx
<Grid justify="start" wrap>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

### Grow
For use within the `Grid` component, `Grow` gives you an element that can be easily sized within the flexbox grid. By providing a value for the `size` prop, your element will receive a corresponding `flex-grow` css attribute.

```typescript
interface GrowProps {
  children?: React.ReactNode
  className?: string
  size: 0 | 1 | 2 | 3
}
```

Here is an example:

```jsx
<Grid>
  <Grow size={2}></Grow>
  <div></div>
  <div></div>
</Grid>
```

### Heading
Creates consistent heading text tags such as `h1`, `h2`, etc... Note that if your heading text is simple, you can avoid unnecessary re-renders by specifying your text via the `text` prop instead of as a child element.

```typescript
interface HeadingProps {
  children?: ReactNode
  className?: string
  size: 1 | 2 | 3 | 4 | 5 | 6
  text?: string
}
```

### Icons
Quartermaster's icons are importable from a the top level of the library as are all other components, however they must be accessed individually from a directory called `/icons`. This makes importing individual icons slightly different from importing other components. To illustrate, let's compare the `Checkmark` icon to the `Button` component.

```javascript
// Importing from the top-level is the same.
import { Button } from "quartermaster"
import { Checkmark } from "quartermaster"

// Importing individually is different.
import Button from "quartermaster/Button
import Checkmark from "quartermaster/icons/Checkmark
```

For each icon, you can specify one of a few pre-determined sizes as well as rotations. Each svg contains a default title, however this can be overriden via the `title` prop on the component. It is highly encouraged that you provide titles for accessibility purposes.

```typescript
interface IconProps {
  className?: string
  rotate?: IconRotation
  ref?: React.Ref<SVGSVGElement>
  size: IconSize
  title?: string
}

// Where...

type IconRotation = 45 | 90 | 135 | 180 | 225 | 270 | 315
type IconSize = "xxs" | "xs" | "s" | "m" | "i" | "l" | "xl" | "xxl"
```

The current list of icons includes:

- `Attn` - A triangle with an exclamation point in the center.
- `Caret` - Resembles an angle bracket pointing up.
- `Checkmark` - A checkmark.
- `Dot` - A small circle.
- `Ex` - Two crossing lines in the shape of the letter "x".
- `Hamburger` - Three stacked, horizontal lines.
- `Info` - A circle with a letter "i" in the center.
- `Meatballs` - Three small circles in a horizontal line.
- `Plus` - An addition sign.
- `Tiles` - 4 small squares, arranged like window panes.
- `Triangle` - A small triangle.

In addition, you may import the `IconWrapper` component which takes the same props as an icon (with a couple extra options), but allows you to manually specify the svg children. Note that when creating an icon with `IconWrapper`, you should assume the svg area to be confined to an 8x8 square. To apply default fills for any given shape, add the `qmPathIsFilled` class to that element. For example:

```jsx
import IconWrapper from "quartermaster/icons/IconWrapper

// Creates a circle icon.
// The full svg area is filled because the x and y center
// points are set to 4 (the area's center) and the radius
// is also 4, thus making an 8px circle.
<IconWrapper disableStroke size="m" title="circle">
  <circle className="qmPathIsFilled" cx="4" cy="4" r="4"></circle>
</IconWrapper>
```

In this case, IconWrapper's props are defined as:

```typescript
interface IconWrapperProps extends IconProps {
  children?: React.ReactNode
  diableStroke?: boolean // Allows you to turn off the default stroke algorithm
}
```

### IconButton
It is often useful to make an icon clickable without applying default button styles. To do that, you can wrap the icon in an `IconButton`.

```typescript
interface IconButtonProps {
  className?: string
  clickHandler?: React.MouseEventHandler
  href?: string // Only applies if `tag` is "a"
  ref?: React.MutableRefObject<HTMLAnchorElement | HTMLButtonElement>
  tag?: "a" | "button"
  title?: string
  type: IconType
}
```

### Label
TextFields and Selects each have a `label` prop allowing you to turn on label text for the element. However you may want to use a label in the same format elsewhere, especially in a form. This component allows you to output a form-style label wherever you want.

```typescript
interface LabelProps {
  className?: string
  htmlFor?: string
  isRequired?: boolean
  text: string
}
```

### Menu
Allows you to build a menu of links and submenus by passing an array of data to this component. Note that submenus can be nested infinitely.

```typescript
interface MenuProps {
  animate?: boolean | Pick<AnimationProps, "direction" | "duration">
  className?: string
  data: Data[]
  isCompact?: boolean
  isLifted?: boolean
  isOpen: boolean
  maxWidth?: string
  minWidth?: string
}

// where AnimationProps are defined in the `Animation` component and...

type Data = LabelData | LinkData | SeparatorData | SubmenuData

// where...

interface LabelData {
  text: string
  type: "label"
}

interface LinkData {
  clickHandler?: React.MouseEventHandler
  component?: Function // Allows you to use React Router's `Link` to build the link
  href?: string
  isActive?: boolean
  text: string
  type: "link"
}

interface SeparatorData {
  type: "separator"
}

interface SubmenuData {
  animate?: boolean | SubAnimate
  data: Data[]
  key: string | number // Must be unique within an instance of `Menu`
  isCollapsible?: boolean
  isLifted?: boolean
  maxWidth?: string
  minWidth?: string
  posX?: "left" | "right"
  posY?: "top" | "bottom"
  startOpen?: boolean
  text: string
  type: "submenu"
}

// where...

interface SubAnimate {
  inDirection?: "left" | "right" | "up" | "down"
  outDirection?: "left" | "right" | "up" | "down"
  inDuration?: number
  outDuration?: number
}
```

Here is an example:

```jsx
<Menu
  maxWidth="200px"
  isLifted={true}
  isCompact={true}
  data={[
    {type: "label", text: "Section 1"},
    {type: "link", text: "Google", href: "https://google.com", isActive: true},
    {type: "link", text: "Yahoo", href: "https://yahoo.com"},
    {
      key: "my-menu",
      type: "submenu",
      text: "Click to open submenu",
      animate: { inDirection: "down", outDirection: "up" },
      startOpen: false,
      isCollapsible: true,
      data: [
        {type: "label", text: "Submenu 1"},
        {type: "link", text: "Wikipedia", href: "https://wikipedia.com"},
        {type: "link", text: "W3Schools", href: "https://w3schools.com"},
      ],
    },
    {type: "separator"},
    {type: "label", text: "Section 2"},
    {type: "link", text: "Bing", href: "https://bing.com"},
    {type: "link", text: "Duck Duck Go", href: "https://duckduckgo.com"},
  ]}
/>
```

The `label` data type creates a non-clickable, stylized label for a section of items in the menu. The `separator` type creates a horizontal line.

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
  className?: string
  groupName?: string
  id?: string
  isChecked: boolean
  isDisabled?: boolean
  label?: string
  ref?: React.MutableRefObject<HTMLInputElement>
  tabIndex?: number
  value?: string
}
```

### Paragraph
Outputs a paragraph with common text styling, including margin at the bottom.

```typescript
interface ParagraphProps {
  children?: React.ReactNode
  className?: string
  isSmaller?: boolean // Creates smaller text
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
  id?: string
  label: string
  ref?: React.MutableRefObject<HTMLInputElement>
  tabIndex?: number
  value: string
}
```

### Select
Generates a stylable select menu built on top of a raw `select` element for accessibility. Is controlled by a `value`, and takes an array of `options` objects and a `changeHandler` for capturing value updates. If `isCompact` is true, it will generate a smaller version of the component.

```typescript
interface SelectProps {
  changeHandler?: (value: string | null) => void
  className?: string
  id?: string
  isCompact?: boolean
  isDisabled?: boolean
  isRequired?: boolean
  label?: string
  options: SelectOption[]
  placeholder?: string
  position?: "top" | "bottom" // Defaults to bottom. Whether the menu opens at the top or bottom.
  value: string | null
}

// Where...

interface SelectOption {
  label: string
  value: string
}
```

### Spinner
Creates a loading spinner in one of the allowed icon sizes.

```typescript
interface SpinnerProps {
  className?: string
  size: IconSize
}

// Where IconSize is defined in the `Icon` component
```

### Space
Wrap any element in a `Space` component to add a measure of consistent spacing to any of the element's 4 sides.

```typescript
interface SpaceProps {
  children?: React.ReactNode
  className?: string
  bottom?: SpaceSize
  left?: SpaceSize
  right?: SpaceSize
  top?: SpaceSize
}

// Where...

type SpaceSize = "xs" | "s" | "m" | "i" | "l" | "xl"
```

### Text
Generates an html wrapper applying common text styles to its content. If it only needs to wrap simple text content, consider placing that content on the `text` prop rather than writing it as a child element. This will help to avoid unnecessary re-rendering.

```typescript
interface Text {
  children?: React.ReactNode
  className?: string
  htmlFor?: string // In case you are creating a label
  isBlock?: boolean // Sets the text to display:block
  isBold?: boolean
  isSmaller?: boolean // Creates smaller text
  isUppercase?: boolean
  tag?: string // Defaults to "span"
  text?: string
  title?: string
}
```

### TextField
Generates an input field or textarea as specified by props. Allows capturing the field ref via a function such as `elem => this.myRef = elem`. Takes both a `changeHandler` and a `keyUpHandler` that you can use to capture new values and capture things like enter key presses. Allows enabling character limits, setting a label and placeholder, marking the field as disabled, and displaying error text. If `isCompact` is true, it will generate a smaller version of the component.

```typescript
interface TextFieldProps {
  blurHandler?: React.FocusEventHandler
  changeHandler?: React.ChangeEventHandler
  charLimit?: number // Enables a CharLimitCounter component on the field
  charLimitIsMinimum?: boolean
  className?: string
  dangerouslyAutoTruncateLimitBreakingValues?: boolean
  defaultValue?: string
  enableTextAreaResize?: boolean
  errorText?: string
  focusHandler?: React.FocusEventHandler
  hasError?: boolean
  hideCharLimitProgress?: boolean
  hideCharLimitText?: boolean
  id?: string
  ignoreLastPass?: boolean
  isCompact?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  isRequired?: boolean
  keyUpHandler?: React.KeyboardEventHandler
  label?: string
  placeholder?: string
  preventInputAtLimit?: boolean // Stops firing events once the char limit has been reached
  ref?: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement>
  tabIndex?: number
  type?: string // For example "text" | "tel" | "password"
  value?: string
}
```

With regard to `dangerouslyAutoTruncateLimitBreakingValues`, this prop is rarely ever needed but is applicable in any case where you might attempt to pass a value to the text field that is greater than a provided char limit, assuming the character count is not expected to be greater than the limit. With this prop set to true, the component will automatically truncate the provided value and fire both a `change` and `keyUp` event with the new value. The prop is labeled as dangerous because if you are not handling these events in such a way that the component re-renders with the new, truncated value, you will trigger an infinitely recursive loop.

### Theme
Quartermaster is theme-able and comes with an alternate dark theme that can be applied. To apply a theme, wrap your application in the `Theme` component and supply a `data` prop specifying the theme data. Note that instantiating `Theme` at **any level** of your nested component tree will apply theme styles to **the entire tree** so it is best to wrap your application in this component near the top level.

```typescript
interface ThemeProps {
  children?: React.ReactNode
  data: CSSData | null
}

// Where...

interface CSSData {
  [key: string]: ValueSpec
}

// Where...

interface ValueSpec {
  [key: string]: string
}
```

Here is an example:

```jsx
import DarkTheme from "quartermaster/themes/Dark

<Theme data={DarkTheme}>
  <App />
</Theme>
```

To create your own themes, you just need to know the format for a theme data object. This object's keys represent css properties (such as `background`) and its values are objects as well. These sub-objects' keys represent css values (such as `#ffffff`), which map to css selector strings (such as `.qmFieldContainer`). This may seem backward at first, but it is an efficient and sane way to manage themeing, wherein you are not attempting to rewrite all of the library's styles, but instead just need to make small adjustments here and there. For example:

```jsx
const RED = "#ff0000"
const WHITE = "#ffffff"
const BLUE = "#0000ff"

const AmericanTheme = {

  "background": {
    [RED]: ".qmSelectContainer, .qmFieldContainer",
    [WHITE]: "body",
    [BLUE]: ".qmCheckboxOverlay, .qmRadioButtonOverlay",
  },

  "border-radius": {
    "0": ".qmSelectContainer, .qmFieldContainer, .qmCheckboxContainer",
  },
}

<Theme data={AmericanTheme}>
  <App />
</Theme>
```

This technique allows you to determine a simple and common set of colors and styles and then choose the selectors to which they apply.

It is also possible to create a very minor extension of a theme simply by wrapping the original `Theme` instance inside another. In this case, the _outermost_ theme styles will take priority (assuming, of course, that the selectors are at least equally specific as the selectors of the innermost theme). For example:

```jsx
// In this case, all DarkTheme styles will be applied but the
// background of .qmTextFieldInputWrapper elements will be
// overridden and set to "red".
<Theme data={{ background: { red: ".qmTextFieldInputWrapper" } }}>
  <Theme data={DarkTheme}>
    <App />
  </Theme>
</Theme>
```

However, you may prefer this alternative approach to extending themes:

```jsx
import { ThemeExtension } from "quartermaster"
// or import { ThemeExtension } from "quartermaster/ThemeExtension"

<ThemeExtension
  base={DarkTheme}
  data={{ background: { red: ".qmTextFieldInputWrapper" } }}>
  <App />
<ThemeExtension>
```

### Toggle
Creates a sliding toggle element wrapped around native checkbox input for optimized accessibility. Allows specifying a label, a `isChecked` state, and a `value` among other features. Allows capturing the checkbox ref via a function such as `elem => this.myRef = elem`.

```typescript
interface ToggleProps {
  changeHandler?: React.ChangeEventHandler
  className?: string
  id?: string
  isChecked: boolean
  isDisabled?: boolean
  label?: string
  ref?: React.MutableRefObject<HTMLInputElement>
  tabIndex?: number
  value?: string
}
```
