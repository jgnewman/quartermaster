import { Dispatch, KeyboardEvent, MouseEvent, RefObject, SetStateAction } from "react";
import { MenuState } from "./types";
export declare function useSubmenuClickHandler(isOpen: boolean, menuKey: string | number, menuState: MenuState, setMenuState: (x: any) => void): (evt: MouseEvent<Element, globalThis.MouseEvent> | KeyboardEvent<Element>) => void;
export declare function useSubmenuKeyHandler(clickHandler: (evt: MouseEvent | KeyboardEvent) => void): (evt: KeyboardEvent<Element>) => void;
export declare function useCloseSubMenuOnBlur(menuKey: string | number, menuState: MenuState, setMenuState: Dispatch<SetStateAction<MenuState>>, submenuRef: RefObject<HTMLDivElement>): void;
export declare function useCloseMenuOnClickAway(menuRef: RefObject<HTMLDivElement>, setState: Dispatch<SetStateAction<MenuState>>, state: MenuState): void;
