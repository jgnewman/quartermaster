import "./styles.styl"

import React, {
  ReactNodeArray,
  memo,
  useMemo,
  useRef,
  useState,
} from "react"

import { DynamicProps } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"

import {
  RefArray,
  RefArrayAdder,
  RefArrayResetter,
  useRefArray,
} from "../lib/internalHooks"

import Label from "../Label"
import Ex from "../icons/Ex"
import Caret from "../icons/Caret"

import type {
  SelectOption,
  SelectProps,
} from "./types"

import {
  ValueSelector,
  useValueSelector,
  useCloseSelectOnClickAway,
  useKeyDownHandler,
  useClickOptionHandler,
  useSiblingOptionFocuser,
  useOptionKeyDownHandler,
  useFocusHandler,
  useBlurHandler,
  useClearButtonHandler,
  useClearButtonFocuser,

} from "./hooks"

export { SelectProps } from "./types"

function useOptionsArray(
  addOptionRef: RefArrayAdder<HTMLSpanElement>,
  currentOptions: RefArray<HTMLSpanElement>,
  options: SelectOption[],
  resetOptionRefs: RefArrayResetter,
  selectValue: ValueSelector,
  value: string | null,
) {
  const focusSiblingOption = useSiblingOptionFocuser(currentOptions)
  const handleClickOption = useClickOptionHandler(selectValue)
  const handleKeyDownOption = useOptionKeyDownHandler(focusSiblingOption, selectValue)

  return useMemo(function () {
    const menuOptionsArray: ReactNodeArray = []
    let selectedLabel: string | null = null

    resetOptionRefs()

    options.forEach(({ label, value: optValue }) => {
      const isSelected = value === optValue

      if (isSelected) {
        selectedLabel = label
      }

      menuOptionsArray.push(
        <span
          key={optValue}
          ref={addOptionRef}
          tabIndex={0}
          className={`qmSelectMenuOption ${buildClassNames({ isSelected })}`}
          data-value={optValue}
          onClick={handleClickOption}
          onKeyDown={handleKeyDownOption}>
          {label}
        </span>,
      )
    })

    return { menuOptionsArray, selectedLabel }
  }, [
    options,
    resetOptionRefs,
    addOptionRef,
    value,
    handleClickOption,
    handleKeyDownOption,
  ])
}

function Select({
  changeHandler,
  className,
  id,
  isCompact = false,
  isDisabled = false,
  isRequired = false,
  label,
  options,
  placeholder = "Select...",
  position = "bottom",
  value,
}: SelectProps) {

  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [currentOptions, addOptionRef, resetOptionRefs] = useRefArray<HTMLSpanElement>([])

  const selectValue = useValueSelector(isOpen, setIsOpen, changeHandler)
  const handleKeyDownSelect = useKeyDownHandler(value, currentOptions)
  const handleFocusSelect = useFocusHandler(setIsFocused, setIsOpen)
  const handleBlurSelect = useBlurHandler(setIsFocused)
  const handleClickClearButton = useClearButtonHandler(isDisabled, selectValue)
  const handleFocusClearButton = useClearButtonFocuser()

  const { menuOptionsArray, selectedLabel } = useOptionsArray(
    addOptionRef,
    currentOptions,
    options,
    resetOptionRefs,
    selectValue,
    value,
  )

  useCloseSelectOnClickAway(
    wrapperRef,
    setIsOpen,
  )

  const textValue = value ? selectedLabel : placeholder
  const hasSelectedValue = !!value
  const isEnabled = !isDisabled
  const isPlaceholder = !hasSelectedValue

  const clickableWrapperProps: DynamicProps = {}

  const labelProps: DynamicProps = {
    className: "qmSelectLabel",
    isRequired,
  }

  if (id) {
    const labelId = `${id}-qmLabel`
    clickableWrapperProps.id = id
    clickableWrapperProps["aria-labelledby"] = labelId

    labelProps.id = labelId
    labelProps.htmlFor = id
  }

  const containerClasses = buildClassNames({
    isCompact,
    isDisabled,
    isEnabled,
    isOpen,
    isRequired,
  })

  const clickableWrapperClasses = buildClassNames({
    isCompact,
    isFocused,
  })

  const displayClasses = buildClassNames({
    isDisabled,
    isEnabled,
    isPlaceholder,
  })

  const buttonClasses = buildClassNames({
    isDisabled,
    isEnabled,
  })

  const positionClasses = buildClassNames({
    isTop: position === "top",
    isBottom: position === "bottom",
  })

  return (
    <div className={`qmSelectContainer ${containerClasses} ${className || ""}`}>

      {label && <Label text={label} {...labelProps} />}

      <div className="qmSelectContentWrapper" ref={wrapperRef}>

        <div
          className={`qmSelectClickableWrapper ${clickableWrapperClasses}`}
          role="button"
          tabIndex={0}
          onFocus={handleFocusSelect}
          onBlur={handleBlurSelect}
          onKeyDown={handleKeyDownSelect}
          {...clickableWrapperProps}>

          <div
            className={`qmSelectDisplay ${displayClasses}`}>
            <span className="qmSelectValue">{textValue}</span>
          </div>

          {hasSelectedValue && (
            <button
              className={`qmSelectClearIconWrapper ${buttonClasses}`}
              onClick={handleClickClearButton}
              onFocus={handleFocusClearButton}>
              <Ex
                className="qmSelectIcon qmSelectClearIcon"
                size="s"
                title="Clear Selection"
              />
            </button>
          )}

          <div className={`qmSelectOpenIconWrapper ${buttonClasses}`}>
            <Caret
              className={`qmSelectIcon qmSelectOpenIcon ${positionClasses}`}
              size="s"
              title="Open"
            />
          </div>

        </div>

        {isOpen && (
          <div className={`qmSelectMenu ${positionClasses}`} role="list" aria-expanded={isOpen}>
            {menuOptionsArray}
          </div>
        )}
      </div>

    </div>
  )
}

Select.displayName = "Select"

export default memo(Select)
