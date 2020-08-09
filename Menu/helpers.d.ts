import type { AnimationProps } from "../Animation";
import { Data, MenuState } from "./types";
export declare function getInitialSubmenuState(data: Data[], state?: MenuState): MenuState;
export declare function genAnimProps(animate: boolean | Pick<AnimationProps, "direction" | "duration"> | undefined, isOpen: boolean): AnimationProps;
