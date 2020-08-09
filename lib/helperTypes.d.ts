export declare type RefFunction = (elem: HTMLElement | null) => void;
export declare type InputElem = HTMLInputElement | HTMLTextAreaElement;
export declare type NullableInputElem = InputElem | null;
export interface DynamicProps {
    [key: string]: unknown;
}
