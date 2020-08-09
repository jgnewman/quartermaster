export declare type IconRotation = 45 | 90 | 135 | 180 | 225 | 270 | 315;
export declare type IconSize = "xxs" | "xs" | "s" | "m" | "i" | "l" | "xl" | "xxl";
export interface IconProps {
    className?: string;
    rotate?: IconRotation;
    size: IconSize;
    title?: string;
}
