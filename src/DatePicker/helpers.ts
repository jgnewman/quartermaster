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

export function decrementMonth(referenceDate: Date): Date {
  const date = new Date(referenceDate)
  const month = date.getMonth()
  const year = date.getFullYear()

  if (month === 0) {
    date.setMonth(11)
    date.setFullYear(year - 1)
  } else {
    date.setMonth(month - 1)
  }

  return date
}

export function incrementMonth(referenceDate: Date): Date {
  const date = new Date(referenceDate)
  const month = date.getMonth()
  const year = date.getFullYear()

  if (month === 11) {
    date.setMonth(0)
    date.setFullYear(year + 1)
  } else {
    date.setMonth(month + 1)
  }

  return date
}

export function isSameDay(a: Date, b: Date): boolean {
  const aDay = a.getDate()
  const aMonth = a.getMonth()
  const aYear = a.getFullYear()

  const bDay = b.getDate()
  const bMonth = b.getMonth()
  const bYear = b.getFullYear()

  return aYear === bYear && aMonth === bMonth && aDay === bDay
}

export function isSameTime(a: Date, b: Date): boolean {
  if (isSameDay(a, b)) {
    const aHour = a.getHours()
    const aMin = a.getMinutes()

    const bHour = b.getHours()
    const bMin = b.getMinutes()

    return aHour === bHour && aMin === bMin
  }
  return false
}

export function getDayTotalForMonth(month: number, fullYear: number): number {
  return (month === 1 && fullYear % 4 === 0) ? 29 : dayTotalMap[month]
}

export interface Day {
  isDisabled: boolean
  date: Date
}

export function setDateToMidnight(date: Date) {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
}

export function getCalendarDataForMonth(referenceDate: Date, disablePast: boolean): Day[][] {
  const now = new Date()
  setDateToMidnight(now)

  const month = referenceDate.getMonth()
  const year = referenceDate.getFullYear()
  const totalDaysOfThisMonth = getDayTotalForMonth(month, year)

  const prevMonth = month === 0 ? 11 : month - 1
  const prevMonthYear = month === 0 ? year - 1 : year

  const nextMonth = month === 11 ? 0 : month + 1
  const nextMonthYear = month === 11 ? year + 1 : year

  const firstDayOfMonth = new Date(`${year}/${month + 1}/1`)
  const firstDayWeekday = firstDayOfMonth.getDay()

  const lastDayOfMonth = new Date(`${year}/${month + 1}/${totalDaysOfThisMonth}`)
  const lastDayWeekday = lastDayOfMonth.getDay()

  const totalPrevDisabledDays = firstDayWeekday
  const totalDaysOfPrevMonth = getDayTotalForMonth(prevMonth, prevMonthYear)

  const totalNextDisabledDays = 6 - lastDayWeekday

  const rows: Day[][] = []
  let curRow: Day[] = []

  let x = totalDaysOfPrevMonth
  let y = totalPrevDisabledDays
  while (y > 0) {
    curRow.push({ isDisabled: true, date: new Date(`${prevMonthYear}/${prevMonth + 1}/${x}`) })
    x -= 1
    y -= 1
  }
  curRow.reverse()

  x = 1
  while (x <= totalDaysOfThisMonth) {
    const date = new Date(`${year}/${month + 1}/${x}`)
    const isDisabled = disablePast ? date < now : false
    curRow.push({ isDisabled, date })
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

export function getHoursForDay(date: Date, increment: number): Date[] {
  const inc = increment || 60
  const hours: Date[] = []

  const referenceDate = new Date(date)
  setDateToMidnight(referenceDate)

  let referenceTime = referenceDate.getTime()
  let totalHours = 24 * (60 / inc)

  while (totalHours > 0) {
    totalHours -= 1
    hours.push(new Date(referenceTime))
    referenceTime = referenceTime + (1000 * 60 * inc)
  }

  return hours
}
