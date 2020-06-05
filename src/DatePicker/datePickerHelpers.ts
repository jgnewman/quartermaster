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

export function decrementMonth(referenceDateStamp: number): number {
  const date = new Date(referenceDateStamp)
  const month = date.getMonth()
  const year = date.getFullYear()

  if (month === 0) {
    date.setMonth(11)
    date.setFullYear(year - 1)
  } else {
    date.setMonth(month - 1)
  }

  return date.getTime()
}

export function incrementMonth(referenceDateStamp: number): number {
  const date = new Date(referenceDateStamp)
  const month = date.getMonth()
  const year = date.getFullYear()

  if (month === 11) {
    date.setMonth(0)
    date.setFullYear(year + 1)
  } else {
    date.setMonth(month + 1)
  }

  return date.getTime()
}

export function isSameDay(a: number, b: number): boolean {
  const aDate = new Date(a)
  const aDay = aDate.getDate()
  const aMonth = aDate.getMonth()
  const aYear = aDate.getFullYear()

  const bDate = new Date(b)
  const bDay = bDate.getDate()
  const bMonth = bDate.getMonth()
  const bYear = bDate.getFullYear()

  return aYear === bYear && aMonth === bMonth && aDay === bDay
}

export function getDayTotalForMonth(month: number, fullYear: number): number {
  return (month === 1 && fullYear % 4 === 0) ? 29 : dayTotalMap[month]
}

interface Day {
  isDisabled: boolean
  date: Date
}

export function getCalendarDataForMonth(referenceDateStamp: number): Day[][] {
  const refDay = new Date(referenceDateStamp)
  const month = refDay.getMonth()
  const year = refDay.getFullYear()
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
    curRow.push({ isDisabled: false, date: new Date(`${year}/${month + 1}/${x}`) })
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
