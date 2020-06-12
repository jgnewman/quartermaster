import {
  useMemo,
} from "react"

export function useFormattedValue(
  formatValue: ((n: number) => string) | undefined,
  value: number,
) {
  return useMemo(function () {
    return formatValue ? formatValue(value) : String(value)
  }, [formatValue, value])
}
