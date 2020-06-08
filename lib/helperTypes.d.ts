import { ChangeEvent } from "react";
export declare type RefFunction = (elem: HTMLElement | null) => void;
export declare type InputElem = HTMLInputElement | HTMLTextAreaElement;
export declare type NullableInputElem = InputElem | null;
export interface FauxChangeEvent {
    target: {
        value: string | number | null;
    };
}
export declare type FauxChangeEventHandler<T = Element> = (event: ChangeEvent<T> | FauxChangeEvent) => void;
export interface DynamicProps {
    [key: string]: unknown;
}
