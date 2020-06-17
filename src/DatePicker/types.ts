export type ValidValue = number | null
export type ValidValueRange = [ValidValue?, ValidValue?]
export type DateRange = [Date | null, Date | null]
export type DatePickerChangeHandler = (v: ValidValue | ValidValueRange) => void

export interface Day {
  isDisabled: boolean
  date: Date
}

export interface TimeMap {
  [timeValue: string]: {
    slideValue: number
    timeValue: number
  }
}
