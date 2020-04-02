import React, { PureComponent, ReactNodeArray } from "react"

import { noopEvtHandler } from "../lib/helpers"
import { DynamicProps, RefFunction } from "../lib/helperTypes"
import Button from "../Button"
import CaretIcon from "../icons/CaretIcon"
import TimesIcon from "../icons/TimesIcon"

import {
  DivCaretWrapper,
  DivClearButtonWrapper,
  DivValueDisplay,
  SpanValueField,
  DivFauxSelectWrapper,
  DivOptionsMenu,
  SpanMenuOption,
  SelectNative,
  DivSelectContainer,
  LabelForSelect,
  DivSelectContentWrapper,
} from "./styles"

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
  public displayName = "Select"
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
        <SpanMenuOption
          key={optValue}
          className={`qm-select-menu-option ${isSelected ? "is-selected" : ""}`}
          data-value={optValue}
          onClick={this.handleClickOption}>
          {label}
        </SpanMenuOption>,
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
      fieldRef,
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

    const wrapperRefFn = (elem: HTMLDivElement | null) => {
      this.wrapperRef = elem
    }

    const selectRefFn = (elem: HTMLSelectElement | null) => {
      this.selectRef = elem
      if (fieldRef) {
        fieldRef(elem)
      }
    }

    const labelProps: DynamicProps = {
      className: "qm-select-label",
    }

    if (id) {
      labelProps.htmlFor = id
    }

    const classes = ["qm-select"]

    if (isOpen) {
      classes.push("is-open")
    }

    if (isDisabled) {
      classes.push("is-disabled")
    }

    if (className) {
      classes.push(className)
    }

    return (
      <DivSelectContainer className={classes.join(" ")} ref={wrapperRefFn}>

        {label && (
          <LabelForSelect {...labelProps}>
            {label}
          </LabelForSelect>
        )}

        <DivSelectContentWrapper className="qm-select-input-wrapper">
          <SelectNative
            ref={selectRefFn}
            disabled={!!isDisabled}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.updateValueOnRawChange}>
            {optionsArray}
          </SelectNative>

          <DivFauxSelectWrapper
            className="qm-select-field-wrapper"
            isFocused={isFocused}
            onClick={isDisabled ? noopEvtHandler : this.handleClickToOpenSelect}
            aria-hidden={true}>

            <DivValueDisplay
              isDisabled={!!isDisabled}
              isShowingPlaceholder={!hasSelectedValue}
              className={`qm-select-display ${!hasSelectedValue ? "is-placeholder" : ""}`}>
              <SpanValueField>{textValue}</SpanValueField>
            </DivValueDisplay>

            {hasSelectedValue && (
              <DivClearButtonWrapper
                isDisabled={!!isDisabled}
                className="qm-clear-button-wrapper">
                <Button
                  className="qm-clear-button"
                  clickHandler={isDisabled ? noopEvtHandler : this.clearValueOnClick}>
                  <TimesIcon className="qm-select-icon qm-clear-icon" title="Clear Selection" />
                </Button>
              </DivClearButtonWrapper>
            )}

            <DivCaretWrapper
              isDisabled={!!isDisabled}
              className="qm-open-icon-wrapper">
              <CaretIcon className="qm-select-icon qm-open-icon" title="Open" />
            </DivCaretWrapper>

          </DivFauxSelectWrapper>

          {isOpen && (
            <DivOptionsMenu className="qm-select-menu" aria-hidden={true}>
              {menuOptionsArray}
            </DivOptionsMenu>
          )}
        </DivSelectContentWrapper>

      </DivSelectContainer>
    )
  }
}

export default Select
