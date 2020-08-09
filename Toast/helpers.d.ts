import { AreaMessages, Listener, Listeners, ToastMessage } from "./types";
export declare const listeners: Listeners;
export declare const areaMessages: AreaMessages;
export declare function addMessageToAreaMessages(eventName: string, msg: ToastMessage): void;
export declare function removeMessageFromAreaMessages(eventName: string, id: string): void;
export declare function publish(eventName: string, msg: ToastMessage): void;
export declare function subscribe(eventName: string, listener: Listener): void;
export declare function unsubscribe(eventName: string, listener: Listener): void;
