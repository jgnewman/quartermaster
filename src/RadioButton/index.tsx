import "./styles.styl"

import React, {
  ChangeEventHandler,
  MutableRefObject,
  forwardRef,
  memo,
  useRef,
} from "react"

import {
  DynamicProps,
} from "../lib/helperTypes"

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
import Dot from "../icons/Dot"

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
                <Dot
                  title="checked"
                  size="l"
                  className="qmRadioDotIcon"
                />
              )}
            </span>
          </span>

          {label && (
            <Text
              className={`qmRadioLabel ${labelClasses}`}
              tag="label"
              {...labelProps}>
              {label}
            </Text>
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
