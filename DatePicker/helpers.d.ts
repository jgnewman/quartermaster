export declare function decrementMonth(referenceDateStamp: number): number;
export declare function incrementMonth(referenceDateStamp: number): number;
export declare function isSameDay(a: number, b: number): boolean;
export declare function isSameTime(a: number, b: number): boolean;
export declare function getDayTotalForMonth(month: number, fullYear: number): number;
export interface Day {
    isDisabled: boolean;
    date: Date;
}
export declare function setDateToMidnight(date: Date): void;
export declare function getCalendarDataForMonth(referenceDateStamp: number, disablePast: boolean): Day[][];
export declare function getHoursForDay(dateStamp: number, increment: number): number[];
