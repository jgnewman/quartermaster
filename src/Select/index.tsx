import "./styles.styl"

import React, {
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  ReactNodeArray,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import { noopEvtHandler, buildClassNames, useRefArray } from "../lib/helpers"
import { DynamicProps } from "../lib/helperTypes"
import Label from "../Label"
import Icon from "../Icon"

interface SelectState {
  isOpen: boolean
  isFocused: boolean
}

interface SelectOption {
  label: string
  value: string
}

export interface SelectProps {
  changeHandler?: (value: string | null) => void
  className?: string
  id?: string
  isRequired?: boolean
  isCompact?: boolean
  isDisabled?: boolean
  label?: string
  options: SelectOption[]
  placeholder?: string
  value: string | null
}

function Select({
  changeHandler,
  className,
  id,
  isCompact,
  isDisabled,
  isRequired,
  label,
  options,
  placeholder = "Select...",
  value,
}: SelectProps) {

  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [currentOptions, addOptionRef, resetOptionRefs] = useRefArray<HTMLSpanElement>([])

  const selectValue = useCallback((newValue: string | null) => {
    isOpen && setIsOpen(false)
    changeHandler && changeHandler(newValue)
  }, [isOpen, setIsOpen, changeHandler])

  const closeSelectOnClickAway = useCallback((evt: any) => {
    const { current: currentWrapperRef } = wrapperRef
    if (currentWrapperRef && !evt.path.includes(currentWrapperRef)) {
      setIsOpen(false)
    }
  }, [wrapperRef, setIsOpen])

  const getSelectedOption = useCallback((): HTMLSpanElement | null => {
    let selectedOption = currentOptions[0]

    currentOptions.some(option => {
      if (option.getAttribute("data-value") === value) {
        selectedOption = option
        return true
      }
      return false
    })

    return selectedOption || null
  }, [value, currentOptions])

  const focusSelectedOption = useCallback(() => {
    getSelectedOption()?.focus()
  }, [getSelectedOption])

  const handleClickOption = useCallback((evt: MouseEvent) => {
    const target = evt.target as HTMLElement
    const newValue = target.getAttribute("data-value") as string
    selectValue(newValue)
  }, [selectValue])

  const focusSiblingOption = useCallback((focusedElem: HTMLSpanElement, direction: "prev" | "next") => {
    const focusIndex = currentOptions.indexOf(focusedElem)

    let elemToFocus: HTMLSpanElement
    if (direction === "prev") {
      elemToFocus = focusIndex < 1 ? currentOptions[currentOptions.length - 1] : currentOptions[focusIndex - 1]
    } else {
      elemToFocus = (focusIndex >= currentOptions.length - 1) ? currentOptions[0] : currentOptions[focusIndex + 1]
    }

    elemToFocus.focus()
  }, [currentOptions])

  const handleKeyDownOption = useCallback((evt: KeyboardEvent) => {
    const { key } = evt
    const target = evt.target as HTMLSpanElement

    switch (key) {

      case "ArrowUp":
        return focusSiblingOption(target, "prev")

      case "ArrowDown":
        return focusSiblingOption(target, "next")

      case " ":
      case "Enter":
        return selectValue(target.getAttribute("data-value"))
    }
  }, [focusSiblingOption, selectValue])

  const buildOptionsArray = useCallback(() => {
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
  }, [options, resetOptionRefs, addOptionRef, value, handleClickOption, handleKeyDownOption])

  const handleFocusSelect = useCallback(() => {
    setIsFocused(true)
    setIsOpen(true)
  }, [setIsFocused, setIsOpen])

  const handleBlurSelect = useCallback(() => {
    setIsFocused(false)
  }, [setIsFocused])

  const handleKeyDownSelect = useCallback((evt: KeyboardEvent) => {
    const { key } = evt
    if (key === " " || key === "ArrowDown") {
      focusSelectedOption()
    }
  }, [focusSelectedOption])

  const handleClickClearButton = useCallback(() => {
    selectValue(null)
  }, [])

  const handleFocusClearButton = useCallback((evt: FocusEvent) => {
    evt.stopPropagation()
  }, [])

  useEffect(() => {
    document.addEventListener("click", closeSelectOnClickAway)
    return () => { document.removeEventListener("click", closeSelectOnClickAway) }
  }, [closeSelectOnClickAway])

  const { menuOptionsArray, selectedLabel } = buildOptionsArray()

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
              onClick={isDisabled ? noopEvtHandler : handleClickClearButton}
              onFocus={handleFocusClearButton}>
              <Icon
                className="qmSelectIcon qmSelectClearIcon"
                type="ex"
                size="xs"
                title="Clear Selection"
              />
            </button>
          )}

          <div className={`qmSelectOpenIconWrapper ${buttonClasses}`}>
            <Icon
              className="qmSelectIcon qmSelectOpenIcon"
              type="caret"
              size="s"
              title="Open"
            />
          </div>

        </div>

        {isOpen && (
          <div className="qmSelectMenu" role="list" aria-expanded={isOpen}>
            {menuOptionsArray}
          </div>
        )}
      </div>

    </div>
  )
}

Select.displayName = "Select"

export default memo(Select)
