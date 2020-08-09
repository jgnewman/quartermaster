export declare type ValidValue = number | null;
export declare type ValidValueRange = [ValidValue?, ValidValue?];
export declare type DateRange = [Date | null, Date | null];
export declare type DatePickerChangeHandler = (v: ValidValue | ValidValueRange) => void;
export interface Day {
    isDisabled: boolean;
    date: Date;
}
export interface TimeMap {
    [timeValue: string]: {
        slideValue: number;
        timeValue: number;
    };
}
