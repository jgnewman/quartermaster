import "./styles.styl"

import React, {
  ChangeEventHandler,
  MutableRefObject,
  forwardRef,
  memo,
  useRef,
} from "react"

import { DynamicProps } from "../lib/helperTypes"

import {
  buildClassNames,
  noopEvtHandler,
} from "../lib/helpers"

import {
  useFocusHandlers,
  useInputChecker,
} from "../lib/internalHooks"

import {
  useMergedRefs,
} from "../hooks"

import Text from "../Text"
import Checkmark from "../icons/Checkmark"

export interface CheckboxProps {
  changeHandler?: ChangeEventHandler
  className?: string
  id?: string
  isChecked: boolean
  isDisabled?: boolean
  label?: string
  tabIndex?: number
  value?: string
}

const Checkbox = forwardRef(function ({
  changeHandler,
  className,
  id,
  isChecked,
  isDisabled,
  label,
  tabIndex,
  value,
}: CheckboxProps, ref: MutableRefObject<HTMLInputElement>) {

  const inputRef = useRef<HTMLInputElement>(null)
  const mergedRef = useMergedRefs(ref, inputRef)
  const handleOverlayClick = useInputChecker(inputRef)

  const {
    isFocused,
    handleFocus,
    handleBlur,
  } = useFocusHandlers()

  const isEnabled = !isDisabled

  const labelProps: DynamicProps = {}
  const boxProps: DynamicProps = {}

  if (id) {
    labelProps.htmlFor = id
    boxProps.id = id
  }

  if (tabIndex) {
    boxProps.tabIndex = tabIndex
  }

  if (changeHandler) {
    boxProps.onChange = changeHandler
  }

  if (value) {
    boxProps.value = value
  }

  const containerClasses = buildClassNames({
    isChecked,
    isDisabled,
    isEnabled,
  })

  const labelClasses = buildClassNames({
    isChecked,
    isDisabled,
    isEnabled,
  })

  const overlayClasses = buildClassNames({
    isChecked,
    isFocused,
  })

  return (
    <span
      className={`qmCheckboxContainer ${containerClasses} ${className || ""}`}>

      <span
        className="qmCheckboxFauxWrapper"
        onClick={isDisabled ? noopEvtHandler : handleOverlayClick}>

        <span className="qmCheckboxCheckWrapper">
          <span
            aria-hidden={true}
            className={`qmCheckboxOverlay ${overlayClasses}`}>
            {isChecked && (
              <Checkmark
                className="qmCheckboxCheckmark"
                size="s"
              />
            )}
          </span>
        </span>

        {label && (
          <Text
            className={`qmCheckboxLabel ${labelClasses}`}
            tag="label"
            text={label}
            {...labelProps}
          />
        )}

      </span>

      <input
        ref={mergedRef}
        checked={isChecked}
        className="qmCheckboxNative"
        disabled={!!isDisabled}
        type="checkbox"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...boxProps}
      />

    </span>
  )

})

Checkbox.displayName = "Checkbox"

export default memo(Checkbox)
