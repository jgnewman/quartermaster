import "./styles.styl"
import React, { PureComponent, ReactNodeArray } from "react"

import { noopEvtHandler, buildClassNames } from "../lib/helpers"
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

class Select extends PureComponent<SelectProps, SelectState> {
  static displayName = "Select"
  public state: SelectState
  private wrapperRef: HTMLDivElement | null
  private optionsRefs: HTMLSpanElement[] = []
  private expectedOptions = { count: 0 }

  constructor(props: SelectProps) {
    super(props)

    this.state = {
      isOpen: false,
      isFocused: false,
    }
  }

  wrapperRefFn = (elem: HTMLDivElement | null) => {
    this.wrapperRef = elem
  }

  optionRefFn = (elem: HTMLSpanElement | null) => {
    const { options } = this.props
    const { expectedOptions, optionsRefs } = this

    if (!elem) {
      return
    }

    if (expectedOptions.count >= options.length) {
      optionsRefs.length = 0
      expectedOptions.count = 0
    }

    expectedOptions.count += 1
    optionsRefs.push(elem)
  }

  handleFocusSelect = () => {
    this.setState({
      isFocused: true,
      isOpen: true,
    })
  }

  handleBlurSelect = () => {
    this.setState({ isFocused: false })
  }

  handleKeyDownSelect = (evt: React.KeyboardEvent) => {
    const { key } = evt
    if (key === " " || key === "ArrowDown") {
      this.focusSelectedOption()
    }
  }

  handleClickOption = (evt: React.MouseEvent) => {
    const target = evt.target as HTMLElement
    const newValue = target.getAttribute("data-value") as string
    this.selectValue(newValue)
  }

  handleKeyDownOption = (evt: React.KeyboardEvent) => {
    const { key } = evt
    const target = evt.target as HTMLSpanElement

    switch (key) {

      case "ArrowUp":
        return this.focusSiblingOption(target, "prev")

      case "ArrowDown":
        return this.focusSiblingOption(target, "next")

      case " ":
      case "Enter":
        return this.selectValue(target.getAttribute("data-value"))
    }
  }

  handleClickClearButton = () => {
    this.selectValue(null)
  }

  handleFocusClearButton = (evt: React.FocusEvent) => {
    evt.stopPropagation()
  }

  closeSelectOnClickAway = (evt: any) => {
    if (this.wrapperRef && !evt.path.includes(this.wrapperRef)) {
      this.closeSelect()
    }
  }

  getSelectedOption(): HTMLSpanElement | null {
    const { value } = this.props
    const { optionsRefs } = this

    let selectedOption = optionsRefs[0]

    optionsRefs.some(option => {
      if (option.getAttribute("data-value") === value) {
        selectedOption = option
        return true
      }
      return false
    })

    return selectedOption || null
  }

  focusSelectedOption() {
    this.getSelectedOption()?.focus()
  }

  focusSiblingOption(focusedElem: HTMLSpanElement, direction: "prev" | "next") {
    const { optionsRefs } = this
    const focusIndex = optionsRefs.indexOf(focusedElem)

    let elemToFocus: HTMLSpanElement
    if (direction === "prev") {
      elemToFocus = focusIndex < 1 ? optionsRefs[optionsRefs.length - 1] : optionsRefs[focusIndex - 1]
    } else {
      elemToFocus = (focusIndex >= optionsRefs.length - 1) ? optionsRefs[0] : optionsRefs[focusIndex + 1]
    }

    elemToFocus.focus()
  }

  selectValue(newValue: string | null) {
    const { changeHandler } = this.props
    this.state.isOpen && this.setState({ isOpen: false })
    changeHandler && changeHandler(newValue)
  }

  openSelect() {
    this.setState({ isOpen: true })
  }

  closeSelect() {
    this.setState({ isOpen: false })
  }

  buildOptionsArray() {
    const { options, value } = this.props
    const menuOptionsArray: ReactNodeArray = []
    let selectedLabel: string | null = null

    options.forEach(({ label, value: optValue }) => {
      const isSelected = value === optValue

      if (isSelected) {
        selectedLabel = label
      }

      menuOptionsArray.push(
        <span
          key={optValue}
          ref={this.optionRefFn}
          tabIndex={0}
          className={`qmSelectMenuOption ${buildClassNames({ isSelected })}`}
          data-value={optValue}
          onClick={this.handleClickOption}
          onKeyDown={this.handleKeyDownOption}>
          {label}
        </span>,
      )
    })

    return { menuOptionsArray, selectedLabel }
  }

  componentDidMount() {
    document.addEventListener("click", this.closeSelectOnClickAway)
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.closeSelectOnClickAway)
  }

  render() {
    const {
      className,
      id,
      isCompact,
      isDisabled,
      isRequired,
      label,
      placeholder = "Select...",
      value,
    } = this.props

    const { isOpen, isFocused } = this.state
    const { menuOptionsArray, selectedLabel } = this.buildOptionsArray()

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

        <div className="qmSelectContentWrapper" ref={this.wrapperRefFn}>

          <div
            className={`qmSelectClickableWrapper ${clickableWrapperClasses}`}
            role="button"
            tabIndex={0}
            onFocus={this.handleFocusSelect}
            onBlur={this.handleBlurSelect}
            onKeyDown={this.handleKeyDownSelect}
            {...clickableWrapperProps}>

            <div
              className={`qmSelectDisplay ${displayClasses}`}>
              <span className="qmSelectValue">{textValue}</span>
            </div>

            {hasSelectedValue && (
              <button
                className={`qmSelectClearIconWrapper ${buttonClasses}`}
                onClick={isDisabled ? noopEvtHandler : this.handleClickClearButton}
                onFocus={this.handleFocusClearButton}>
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
}

export default Select
