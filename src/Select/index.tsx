import React, { PureComponent, ReactNodeArray } from "react"

import { noopEvtHandler } from "../lib/helpers"
import { DynamicProps } from "../lib/helperTypes"
import Button from "../Button"
import CaretIcon from "../icons/CaretIcon"
import TimesIcon from "../icons/TimesIcon"

import {
  StyledDisplayDiv,
  StyledDisplaySpan,
  StyledInputWrapperDiv,
  StyledMenu,
  StyledMenuOption,
  StyledSelect,
  StyledSelectContainer,
  StyledSelectLabel,
  StyledSelectWrapperDiv,
} from "./styles"

interface SelectState {
  isOpen: boolean
}

interface SelectOption {
  label: string
  value: string
}

export interface SelectProps {
  changeHandler?: (value: string | null) => void
  className?: string
  id?: string
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

  constructor(props: SelectProps) {
    super(props)

    this.state = {
      isOpen: false,
    }
  }

  openSelect = () => {
    this.setState({ isOpen: true })
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
        <StyledMenuOption
          key={optValue}
          className={`qm-select-menu-option ${isSelected ? "is-selected" : ""}`}
          data-value={optValue}
          onClick={this.handleClickOption}>
          {label}
        </StyledMenuOption>,
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

    const { isOpen } = this.state
    const { optionsArray, menuOptionsArray, selectedLabel } = this.buildOptionArrays()
    const textValue = value ? selectedLabel : placeholder
    const hasSelectedValue = !!value

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
      <StyledSelectContainer className={classes.join(" ")} ref={ elem => this.wrapperRef = elem }>

        {label && (
          <StyledSelectLabel {...labelProps}>
            {label}
          </StyledSelectLabel>
        )}

        <StyledSelectWrapperDiv className="qm-select-input-wrapper">
          <StyledSelect
            disabled={!!isDisabled}
            onChange={this.updateValueOnRawChange}>
            {optionsArray}
          </StyledSelect>

          <StyledInputWrapperDiv
            className="qm-select-field-wrapper"
            onClick={isDisabled ? noopEvtHandler : this.openSelect}
            aria-hidden={true}>

            <StyledDisplayDiv
              isDisabled={!!isDisabled}
              isShowingPlaceholder={!hasSelectedValue}
              className={`qm-select-display ${!hasSelectedValue ? "is-placeholder" : ""}`}>
              <StyledDisplaySpan>{textValue}</StyledDisplaySpan>
            </StyledDisplayDiv>

            {hasSelectedValue && (
              <Button
                className="qm-clear-button"
                clickHandler={isDisabled ? noopEvtHandler : this.clearValueOnClick}>
                <TimesIcon className="qm-select-icon qm-clear-icon" title="Clear Selection" />
              </Button>
            )}

            <CaretIcon className="qm-select-icon qm-open-icon" title="Open" />

          </StyledInputWrapperDiv>

          {isOpen && (
            <StyledMenu className="qm-select-menu" aria-hidden={true}>
              {menuOptionsArray}
            </StyledMenu>
          )}
        </StyledSelectWrapperDiv>

      </StyledSelectContainer>
    )
  }
}

export default Select
