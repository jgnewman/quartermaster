import "./styles.styl"

import React, {
  ChangeEventHandler,
  MutableRefObject,
  forwardRef,
  memo,
  useRef,
} from "react"

import Checkmark from "../icons/Checkmark"

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
}: ToggleProps, ref: MutableRefObject<HTMLInputElement>) {

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
            <Checkmark
              className={`qmToggleCheckmark ${sliderAndCheckmarkClasses}`}
              size="s"
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
        ref={mergedRef}
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
