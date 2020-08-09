import { MutableRefObject } from "react";
import { RefFunction } from "../lib/helperTypes";
export declare type NullableRefObject = MutableRefObject<any> | null;
export declare function useId(): string;
export declare function useMergedRefs(refA: NullableRefObject, refB: NullableRefObject): RefFunction;
export declare function usePrevious<T>(value: T): T | undefined;
export declare function useSyncRef<T>(value: T): MutableRefObject<T | undefined>;
