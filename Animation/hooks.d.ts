import { Dispatch, SetStateAction } from "react";
export declare function useHider(isHidden: boolean, setHidden: Dispatch<SetStateAction<boolean>>, shouldUseHider: boolean, isOverrideHide: boolean, duration: number, type: "fadeIn" | "fadeOut"): void;
export declare function useDetachedElements(displayNoneOnHide: boolean, duration: number, isOverrideHide: boolean, removeOnHide: boolean, type: "fadeIn" | "fadeOut"): [boolean, boolean];
