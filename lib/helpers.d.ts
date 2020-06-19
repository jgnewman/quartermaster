import { DynamicProps, InputElem } from "./helperTypes";
export declare function noopEvtHandler(): void;
export declare function manuallySetFieldValue(ref: InputElem, value: string, isTextArea: boolean, events?: string[]): void;
declare global {
    interface Window {
        [key: string]: unknown;
    }
}
export declare function manuallyTickCheckbox(ref: HTMLInputElement): void;
export declare function manuallyTickRadioButton(ref: HTMLInputElement): void;
export declare function buildClassNames(options: DynamicProps): string;
export declare function createId(): string;
export declare function disableScrolling(): void;
export declare function enableScrolling(): void;
export declare function elemInEventPath(elem: HTMLElement | null | undefined, evt: any): boolean;
