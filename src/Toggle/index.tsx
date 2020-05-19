import "./styles.styl"

import React, {
  ChangeEventHandler,
  RefObject,
  forwardRef,
  memo,
  useCallback,
  useRef,
  useState,
} from "react"

import Icon from "../Icon"

import { DynamicProps } from "../lib/helperTypes"

import {
  buildClassNames,
  noopEvtHandler,
  manuallyTickCheckbox,
} from "../lib/helpers"

export interface ToggleProps {
  changeHandler?: ChangeEventHandler
  className?: string
  id?: string
  isChecked: boolean
  isDisabled?: boolean
  label?: string
  tabIndex?: number
  value?: string
}

const Toggle = forwardRef(function ({
  changeHandler,
  className,
  id,
  isChecked,
  isDisabled,
  label,
  tabIndex,
  value,
}: ToggleProps, ref: RefObject<HTMLInputElement>) {

  const inputRef = ref || useRef<HTMLInputElement>(null)

  const handleOverlayClick = useCallback(() => {
    const { current: currentInput } = inputRef
    currentInput && manuallyTickCheckbox(currentInput)
  }, [inputRef])

  const [isFocused, setIsFocused] = useState(false)
  const handleFocus = useCallback(() => setIsFocused(true), [setIsFocused])
  const handleBlur = useCallback(() => setIsFocused(false), [setIsFocused])

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

  const sliderAndCheckmarkClasses = buildClassNames({
    isChecked,
  })

  return (
    <span
      className={`qmToggleContainer ${containerClasses} ${className || ""}`}>

      <span
        className="qmToggleFauxWrapper"
        onClick={isDisabled ? noopEvtHandler : handleOverlayClick}>

        <span className="qmToggleCheckWrapper">
          <span
            aria-hidden={true}
            className={`qmToggleOverlay ${overlayClasses}`}>
            <Icon
              className={`qmToggleCheckmark ${sliderAndCheckmarkClasses}`}
              type="checkmark"
              size="xs"
            />
            <span className={`qmToggleSlider ${sliderAndCheckmarkClasses}`}></span>
          </span>
        </span>

        {label && (
          <label
            className={`qmToggleLabel ${labelClasses}`}
            {...labelProps}>
            {label}
          </label>
        )}

      </span>

      <input
        ref={inputRef}
        checked={isChecked}
        className="qmToggleNative"
        disabled={!!isDisabled}
        type="checkbox"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...boxProps}
      />

    </span>
  )
})

Toggle.displayName = "Toggle"

export default memo(Toggle)
