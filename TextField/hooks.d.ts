import { ChangeEvent, ChangeEventHandler, KeyboardEvent, KeyboardEventHandler, RefObject } from "react";
import type { InputElem } from "../lib/helperTypes";
export declare function usePreventInputDecision(charLimit: number | undefined, charLimitIsMinimum: boolean, preventInputAtLimit: boolean, value?: string): (evtTarget: InputElem) => boolean;
export declare function useTruncateValueDecision(inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>, charLimit: number | undefined, dangerouslyAutoTruncateLimitBreakingValues: boolean, charLimitIsMinimum: boolean, preventInputAtLimit: boolean, type: string | undefined, value?: string): () => void;
export declare function useChangeHandler(type: string | undefined, changeHandler: ChangeEventHandler | undefined, inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>, shouldPreventInput: ReturnType<typeof usePreventInputDecision>): (evt: ChangeEvent) => void;
export declare function useKeyUpHandler(keyUpHandler: KeyboardEventHandler | undefined, shouldPreventInput: ReturnType<typeof usePreventInputDecision>): (evt: KeyboardEvent) => void;
export declare function useCleanupField(inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>, maybeTruncateValue: ReturnType<typeof useTruncateValueDecision>, prevVal: string | undefined, type: string | undefined, value: string | undefined): void;
