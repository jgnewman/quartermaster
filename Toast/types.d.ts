export declare type XPos = "left" | "center" | "right";
export declare type YPos = "top" | "bottom";
export declare type ToastType = "error" | "info" | "warning" | "success";
export interface PublishableMessage {
    body: string;
    duration?: number;
    isDismissible?: boolean;
    type?: ToastType;
}
export interface ToastMessage extends PublishableMessage {
    id: string;
    alignment: XPos;
}
export interface ToastProps extends ToastMessage {
    eventName: string;
    isBottom: boolean;
    isDismissible?: boolean;
}
export interface ToastListProps {
    eventName: string;
    isBottom: boolean;
}
export interface Listeners {
    [key: string]: Listener[];
}
export interface AreaMessages {
    [key: string]: ToastMessage[];
}
export declare type Listener = (messages: ToastMessage[]) => void;
