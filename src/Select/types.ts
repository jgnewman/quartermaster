export interface SelectOption {
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
  position?: "top" | "bottom"
  value: string | null
}
