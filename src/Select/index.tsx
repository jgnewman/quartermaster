import "./styles.styl"

import React, {
  Dispatch,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  ReactNodeArray,
  RefObject,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
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
} from "../lib/hooks"

import Label from "../Label"
import Ex from "../icons/Ex"
import Caret from "../icons/Caret"

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

type ValueSelector = (newValue: string | null) => void

function useValueSelector(
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  changeHandler: SelectProps['changeHandler'],
): ValueSelector {
  return useCallback(function (newValue: string | null) {
    isOpen && setIsOpen(false)
    changeHandler && changeHandler(newValue)
  }, [
    changeHandler,
    isOpen,
    setIsOpen,
  ])
}

function useCloseSelectOnClickAway(
  wrapperRef: RefObject<HTMLDivElement>,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
) {

  const closeOnClickAway = useCallback(function (evt: any) {
    const { current: currentWrapperRef } = wrapperRef
    if (currentWrapperRef && !evt.path.includes(currentWrapperRef)) {
      setIsOpen(false)
    }
  }, [
    wrapperRef,
    setIsOpen,
  ])

  useEffect(function () {
    document.addEventListener("click", closeOnClickAway)
    return function () {
      document.removeEventListener("click", closeOnClickAway)
    }
  }, [closeOnClickAway])

}

function useSelectedOption(
  value: string | null,
  currentOptions: RefArray<HTMLSpanElement>,
) {
  return useCallback(function (): HTMLSpanElement | null {
    let selectedOption = currentOptions[0]

    currentOptions.some(option => {
      if (option.getAttribute("data-value") === value) {
        selectedOption = option
        return true
      }
      return false
    })

    return selectedOption || null
  }, [
    value,
    currentOptions,
  ])
}

function useSelectedOptionFocuser(
  value: string | null,
  currentOptions: RefArray<HTMLSpanElement>,
) {
  const getSelectedOption = useSelectedOption(value, currentOptions)
  return useCallback(function () {
    getSelectedOption()?.focus()
  }, [getSelectedOption])
}

function useKeydownHandler(
  value: string | null,
  currentOptions: RefArray<HTMLSpanElement>,
) {
  const focusSelectedOption = useSelectedOptionFocuser(value, currentOptions)
  return useCallback(function (evt: KeyboardEvent) {
    const { key } = evt
    if (key === " " || key === "ArrowDown") {
      focusSelectedOption()
    }
  }, [focusSelectedOption])
}

function useClickOptionHandler(selectValue: ValueSelector) {
  return useCallback(function (evt: MouseEvent) {
    const target = evt.target as HTMLElement
    const newValue = target.getAttribute("data-value") as string
    selectValue(newValue)
  }, [selectValue])
}

type SiblingOptionFocuser = (focusedElem: HTMLSpanElement, direction: "prev" | "next") => void

function useSiblingOptionFocuser(
  currentOptions: RefArray<HTMLSpanElement>,
): SiblingOptionFocuser {
  return useCallback(function (focusedElem: HTMLSpanElement, direction: "prev" | "next") {
    const focusIndex = currentOptions.indexOf(focusedElem)

    let elemToFocus: HTMLSpanElement
    if (direction === "prev") {
      elemToFocus = focusIndex < 1 ? currentOptions[currentOptions.length - 1] : currentOptions[focusIndex - 1]
    } else {
      elemToFocus = (focusIndex >= currentOptions.length - 1) ? currentOptions[0] : currentOptions[focusIndex + 1]
    }

    elemToFocus.focus()
  }, [currentOptions])
}

function useOptionKeyDownHandler(
  focusSiblingOption: SiblingOptionFocuser,
  selectValue: ValueSelector,
) {
  return useCallback(function (evt: KeyboardEvent) {
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
  }, [
    focusSiblingOption,
    selectValue,
  ])
}

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

function useFocusHandler(
  setIsFocused: Dispatch<SetStateAction<boolean>>,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
) {
  return useCallback(function () {
    setIsFocused(true)
    setIsOpen(true)
  }, [
    setIsFocused,
    setIsOpen,
  ])
}

function useBlurHandler(setIsFocused: Dispatch<SetStateAction<boolean>>) {
  return useCallback(function () {
    setIsFocused(false)
  }, [setIsFocused])
}

function useClearButtonHandler(isDisabled: boolean, selectValue: ValueSelector) {
  return useCallback(function () {
    !isDisabled && selectValue(null)
  }, [isDisabled, selectValue])
}

function useClearButtonFocuser() {
  return useCallback(function (evt: FocusEvent) {
    evt.stopPropagation()
  }, [])
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
  value,
}: SelectProps) {

  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [currentOptions, addOptionRef, resetOptionRefs] = useRefArray<HTMLSpanElement>([])

  const selectValue = useValueSelector(isOpen, setIsOpen, changeHandler)
  const handleKeyDownSelect = useKeydownHandler(value, currentOptions)
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
              className="qmSelectIcon qmSelectOpenIcon"
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
