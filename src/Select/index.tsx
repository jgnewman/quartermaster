import "./styles.styl"
import React, { PureComponent, ReactNodeArray } from "react"

import { noopEvtHandler, buildClassNames } from "../lib/helpers"
import { DynamicProps, RefFunction } from "../lib/helperTypes"
import CaretIcon from "../icons/CaretIcon"
import TimesIcon from "../icons/TimesIcon"

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
  fieldRef?: RefFunction // function like (elem => this.myRef = elem)
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
  private selectRef: HTMLSelectElement | null

  constructor(props: SelectProps) {
    super(props)

    this.state = {
      isOpen: false,
      isFocused: false,
    }
  }

  handleFocus = () => this.setState({ isFocused: true, isOpen: true })
  handleBlur = () => this.setState({ isFocused: false })

  handleClickToOpenSelect = () => {
    this.setState({ isOpen: true })
    if (this.selectRef) {
      this.selectRef.focus()
    }
  }

  closeSelect = () => {
    this.setState({ isOpen: false })
  }

  updateValueOnRawChange = (evt: React.ChangeEvent) => {
    const newValue = (evt.target as HTMLSelectElement).value
    this.selectValue(newValue)
  }

  handleClickOption = (evt: React.MouseEvent) => {
    const target = evt.target as HTMLElement
    const newValue = target.getAttribute("data-value") as string
    this.selectValue(newValue)
  }

  selectValue(newValue: string | null) {
    const { changeHandler } = this.props
    this.state.isOpen && this.setState({ isOpen: false })

    if (changeHandler) {
      changeHandler(newValue)
    }
  }

  closeSelectOnClickAway = (evt: any) => {
    if (this.wrapperRef && !evt.path.includes(this.wrapperRef)) {
      this.closeSelect()
    }
  }

  clearValueOnClick = (evt: React.MouseEvent) => {
    evt.stopPropagation()
    this.selectValue(null)
  }

  wrapperRefFn = (elem: HTMLDivElement | null) => {
    this.wrapperRef = elem
  }

  selectRefFn = (elem: HTMLSelectElement | null) => {
    const { fieldRef } = this.props
    this.selectRef = elem
    fieldRef && fieldRef(elem)
  }

  buildOptionArrays() {
    const { options, value } = this.props
    const optionsArray: ReactNodeArray = []
    const menuOptionsArray: ReactNodeArray = []
    let selectedLabel: string | null = null

    options.forEach(({ label, value: optValue }) => {
      const isSelected = value === optValue

      if (isSelected) {
        selectedLabel = label
      }

      optionsArray.push(<option key={optValue} value={optValue}>{label}</option>)

      menuOptionsArray.push(
        <span
          key={optValue}
          className={`qmSelectMenuOption ${buildClassNames({ isSelected })}`}
          data-value={optValue}
          onClick={this.handleClickOption}>
          {label}
        </span>,
      )
    })

    return { optionsArray, menuOptionsArray, selectedLabel }
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
      isDisabled,
      label,
      placeholder = "Select...",
      value,
    } = this.props

    const { isOpen, isFocused } = this.state
    const { optionsArray, menuOptionsArray, selectedLabel } = this.buildOptionArrays()

    const textValue = value ? selectedLabel : placeholder
    const hasSelectedValue = !!value
    const isEnabled = !isDisabled
    const isPlaceholder = !hasSelectedValue

    const labelProps: DynamicProps = {
      className: "qmSelectLabel",
    }

    if (id) {
      labelProps.htmlFor = id
    }

    const containerClasses = buildClassNames({
      isDisabled,
      isEnabled,
      isOpen,
    })

    const fieldWrapperClasses = buildClassNames({
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

        {label && (
          <label {...labelProps}>
            {label}
          </label>
        )}

        <div className="qmSelectContentWrapper" ref={this.wrapperRefFn}>
          <select
            className="qmSelectNative"
            ref={this.selectRefFn}
            disabled={!!isDisabled}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.updateValueOnRawChange}>
            {optionsArray}
          </select>

          <div
            className={`qmSelectFieldWrapper ${fieldWrapperClasses}`}
            onClick={isDisabled ? noopEvtHandler : this.handleClickToOpenSelect}
            aria-hidden={true}>

            <div
              className={`qmSelectDisplay ${displayClasses}`}>
              <span className="qmSelectValue">{textValue}</span>
            </div>

            {hasSelectedValue && (
              <button
                className={`qmSelectClearIconWrapper ${buttonClasses}`}
                onClick={isDisabled ? noopEvtHandler : this.clearValueOnClick}>
                <TimesIcon className="qmSelectIcon qmSelectClearIcon" title="Clear Selection" />
              </button>
            )}

            <div className={`qmSelectOpenIconWrapper ${buttonClasses}`}>
              <CaretIcon className="qmSelectIcon qmSelectOpenIcon" title="Open" />
            </div>

          </div>

          {isOpen && (
            <div className="qmSelectMenu" aria-hidden={true}>
              {menuOptionsArray}
            </div>
          )}
        </div>

      </div>
    )
  }
}

export default Select
