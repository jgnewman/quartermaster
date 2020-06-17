import type {
  Day,
  TimeMap,
} from "./types"

const dayTotalMap = {
  0: 31,
  1: 28,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31,
}

export function nullableDateFromValue(value?: number | null): Date | null {
  return value ? new Date(value) : null
}

export function updatedDateFromValue(
  curItem: Date | null,
  newNum?: number | null,
) {
  if (!curItem) {
    return nullableDateFromValue(newNum)
  } else {
    return curItem.getTime() === newNum ? curItem : nullableDateFromValue(newNum)
  }
}

export function getDayTotalForMonth(month: number, fullYear: number): number {
  if (month === 1) {
    const isDivBy4 = fullYear % 4 === 0
    const isDivBy100 = isDivBy4 && fullYear % 100 === 0
    const isDivBy400 = isDivBy100 && fullYear % 400 === 0

    const isLeapYear = isDivBy4 && (isDivBy100 ? (isDivBy400 ? true : false) : true)
    return isLeapYear ? 29 : 28
  }
  return dayTotalMap[month]
}

export function getLocalizedDay(date: Date, weekStartsOnMonday: boolean) {
  let day = date.getDay()

  if (weekStartsOnMonday) {
    day = day - 1
  }

  if (day === -1) {
    day = 6
  }

  return day
}

export function setDateToMidnight(date: Date) {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
}

export function setDateToNextIncrement(date: Date, increment: number, from?: Date) {
  if (from && from > date) {
    date.setTime(from.getTime())
  }

  const curMinutes = date.getMinutes()
  const incMod = curMinutes % increment

  // Don't jump to next increment if current minutes are already divisible by the increment
  const minutesToAdd = !incMod ? 0 : increment - incMod

  date.setMinutes(curMinutes + minutesToAdd)
  date.setSeconds(0)
  date.setMilliseconds(0)
}

export function setDateToLastMS(date: Date) {
  date.setHours(23)
  date.setMinutes(59)
  date.setSeconds(59)
  date.setMilliseconds(999)
}

export function getCalendarData(
  disablePast: boolean,
  referenceMonth: number,
  referenceYear: number,
  weekStartsOnMonday: boolean,
): Day[][] {
  const now = new Date()
  setDateToMidnight(now)

  const totalDaysOfThisMonth = getDayTotalForMonth(referenceMonth, referenceYear)
  const prevMonth = referenceMonth === 0 ? 11 : referenceMonth - 1
  const prevMonthYear = referenceMonth === 0 ? referenceYear - 1 : referenceYear
  const nextMonth = referenceMonth === 11 ? 0 : referenceMonth + 1
  const nextMonthYear = referenceMonth === 11 ? referenceYear + 1 : referenceYear

  const firstDayOfMonth = new Date(`${referenceYear}/${referenceMonth + 1}/1`)
  const firstDayWeekday = getLocalizedDay(firstDayOfMonth, weekStartsOnMonday)

  const lastDayOfMonth = new Date(`${referenceYear}/${referenceMonth + 1}/${totalDaysOfThisMonth}`)
  const lastDayWeekday = getLocalizedDay(lastDayOfMonth, weekStartsOnMonday)

  const totalPrevDisabledDays = firstDayWeekday
  const totalDaysOfPrevMonth = getDayTotalForMonth(prevMonth, prevMonthYear)

  const totalNextDisabledDays = 6 - lastDayWeekday

  const rows: Day[][] = []
  let curRow: Day[] = []

  let x = totalDaysOfPrevMonth
  let y = totalPrevDisabledDays
  while (y > 0) {
    curRow.push({
      isDisabled: true,
      date: new Date(`${prevMonthYear}/${prevMonth + 1}/${x}`),
    })
    x -= 1
    y -= 1
  }
  curRow.reverse()

  x = 1
  while (x <= totalDaysOfThisMonth) {
    const date = new Date(`${referenceYear}/${referenceMonth + 1}/${x}`)
    curRow.push({
      isDisabled: disablePast ? date < now : false,
      date,
    })
    x += 1
    if (curRow.length === 7) {
      rows.push(curRow)
      curRow = []
    }
  }

  x = 0
  while (x < totalNextDisabledDays) {
    curRow.push({ isDisabled: true, date: new Date(`${nextMonthYear}/${nextMonth + 1}/${x + 1}`) })
    x += 1
  }

  rows.push(curRow)
  return rows
}

export function isSameDay(a: Date | null, b: Date | null): boolean {
  if (a === null || b === null) {
    return false
  }

  const aDay = a.getDate()
  const aMonth = a.getMonth()
  const aYear = a.getFullYear()

  const bDay = b.getDate()
  const bMonth = b.getMonth()
  const bYear = b.getFullYear()

  return aYear === bYear && aMonth === bMonth && aDay === bDay
}

export function isEarlierDayThan(a: Date | null, b: Date | null): boolean {
  if (a === null || b === null) {
    return false
  }

  if (b < a) {
    return false
  }

  const aDay = a.getDate()
  const aMonth = a.getMonth()
  const aYear = a.getFullYear()

  const bDay = b.getDate()
  const bMonth = b.getMonth()
  const bYear = b.getFullYear()

  return aYear < bYear || aMonth < bMonth || aDay < bDay
}

export function getTimeMapFromDate(
  date: Date,
  disablePast: boolean | undefined,
  now: Date,
  timeIncrement: number,
): TimeMap {

  const dateIsToday = isSameDay(date, now)
  const firstPossibleTimeDate = new Date(now)

  // if past is disabled and date is today, set to next increment from now
  // if past is disabled and date is before today, we should expect to have adjusted it to today
  // if past is disabled and date is in future (else case), set to midnight
  if (disablePast && dateIsToday) {
    setDateToNextIncrement(firstPossibleTimeDate, timeIncrement, now)
  } else {
    setDateToMidnight(firstPossibleTimeDate)
  }

  const firstPossibleTime = firstPossibleTimeDate.getTime()

  const lastPossibleTimeDate = new Date(firstPossibleTimeDate)
  setDateToLastMS(lastPossibleTimeDate)
  const lastPossibleTime = lastPossibleTimeDate.getTime()

  const timeMap: TimeMap = {}
  let time = firstPossibleTime
  let index = 0

  while (time < lastPossibleTime) {
    timeMap[index] = { slideValue: index, timeValue: time }
    index += 1
    time += (1000 * 60 * timeIncrement)
  }

  return timeMap
}
