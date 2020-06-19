import { FocusEvent, FocusEventHandler, RefObject } from "react";
export declare type RefArray<T> = T[];
export declare type RefArrayAdder<T> = (item: T) => void;
export declare type RefArrayResetter = () => void;
export declare function useRefArray<T>(value?: T[]): [RefArray<T>, RefArrayAdder<T>, RefArrayResetter];
export declare function useFocusHandlers(focusHandler?: FocusEventHandler, blurHandler?: FocusEventHandler): {
    isFocused: boolean;
    handleFocus: (evt: FocusEvent<Element>) => void;
    handleBlur: (evt: FocusEvent<Element>) => void;
};
export declare function useInputChecker(inputRef: RefObject<HTMLInputElement>): () => void;
export declare function useScrollHandling(shouldBeDisabled: boolean): void;
