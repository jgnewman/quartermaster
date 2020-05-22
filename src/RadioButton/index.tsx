import "./styles.styl"

import React, {
  ChangeEventHandler,
  MutableRefObject,
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"

import { DynamicProps } from "../lib/helperTypes"

import Icon from "../Icon"

import {
  buildClassNames,
  noopEvtHandler,
  manuallyTickRadioButton,
  mergeRefs,
} from "../lib/helpers"

export interface RadioButtonProps {
  changeHandler?: ChangeEventHandler
  className?: string
  groupName?: string
  id?: string
  isChecked: boolean
  isDisabled?: boolean
  label?: string
  tabIndex?: number
  value?: string
}

const RadioButton = forwardRef(function ({
  changeHandler,
  className,
  groupName,
  id,
  isChecked,
  isDisabled,
  label,
  tabIndex,
  value,
}: RadioButtonProps, ref: MutableRefObject<HTMLInputElement>) {

  const inputRef = useRef<HTMLInputElement>(null)
  const mergedRef = useMemo(() => mergeRefs(ref, inputRef), [ref, inputRef])

  const handleOverlayClick = useCallback(() => {
    const { current: currentInput } = inputRef
    currentInput && manuallyTickRadioButton(currentInput)
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

    if (groupName) {
      boxProps.name = groupName
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

    const overlayClasses = buildClassNames({
      isChecked,
      isFocused,
    })

    const labelClasses = buildClassNames({
      isChecked,
      isDisabled,
      isEnabled,
    })

    return (
      <span
        className={`qmRadioContainer ${containerClasses} ${className || ""}`}>

        <span
          className="qmRadioFauxWrapper"
          onClick={isDisabled ? noopEvtHandler : handleOverlayClick}>

          <span className="qmRadioCheckWrapper">
            <span
              aria-hidden={true}
              className={`qmRadioOverlay ${overlayClasses}`}>
              {isChecked && (
                <Icon
                  type="dot"
                  title="checked"
                  size="xxs"
                  className="qmRadioDotIcon"
                />
              )}
            </span>
          </span>

          {label && (
            <label
              className={`qmRadioLabel ${labelClasses}`}
              {...labelProps}>
              {label}
            </label>
          )}

        </span>

        <input
          ref={mergedRef}
          checked={isChecked}
          className="qmRadioNative"
          disabled={!!isDisabled}
          type="radio"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...boxProps}
        />

      </span>
    )

})

RadioButton.displayName = "RadioButton"

export default memo(RadioButton)
