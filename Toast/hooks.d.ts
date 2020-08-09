import { Dispatch, SetStateAction } from "react";
import { ToastMessage } from "./types";
export declare function useToastListener(eventName: string, setMessages: Dispatch<SetStateAction<ToastMessage[]>>): void;
export declare function useMessageRemover(eventName: string, id: string, duration: number, setShouldShow: Dispatch<SetStateAction<boolean>>): () => void;
