import type { MouseEventHandler } from "react";
export interface SubAnimate {
    inDirection?: "left" | "right" | "up" | "down";
    outDirection?: "left" | "right" | "up" | "down";
    inDuration?: number;
    outDuration?: number;
}
export interface LabelData {
    text: string;
    type: "label";
}
export interface LinkData {
    clickHandler?: MouseEventHandler;
    component?: Function;
    href?: string;
    isActive?: boolean;
    text: string;
    type: "link";
}
export interface MenuState {
    [key: string]: {
        isOpen: boolean;
        hasToggled: boolean;
    };
}
export interface SubmenuData {
    animate?: boolean | SubAnimate;
    data: Data[];
    key: string | number;
    isCollapsible?: boolean;
    isLifted?: boolean;
    maxWidth?: string;
    minWidth?: string;
    posX?: "left" | "right";
    posY?: "top" | "bottom";
    startOpen?: boolean;
    text: string;
    type: "submenu";
}
export interface SeparatorData {
    type: "separator";
}
export declare type Data = LabelData | LinkData | SeparatorData | SubmenuData;
