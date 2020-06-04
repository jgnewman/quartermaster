import {
  useMemo,
} from "react"

export function useDateStamp(value?: Date | number | string | null): number | null {
  return useMemo(function () {
    if (!value) {
      return null
    }

    if (typeof value === "number") {
      return value
    }

    if (value instanceof Date) {
      return value.getTime()
    }

    return (new Date(value)).getTime()
  }, [value])
}

export function useDateString(stamp: number | null): string {
  return useMemo(function () {
    if (!stamp) {
      return ""
    }

    return new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(stamp))
  }, [stamp])
}
