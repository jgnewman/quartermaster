import { useCallback, useEffect, useState, } from "react";
import { subscribe, unsubscribe, removeMessageFromAreaMessages, } from "./helpers";
export function useToastListener(eventName, setMessages) {
    const listener = useCallback(function (msgs) {
        setMessages(msgs);
    }, [setMessages]);
    useEffect(function () {
        subscribe(eventName, listener);
        return function () {
            unsubscribe(eventName, listener);
        };
    }, [listener, eventName]);
}
export function useMessageRemover(eventName, id, duration, setShouldShow) {
    const [timer, setTimer] = useState(-1);
    const killMessage = useCallback(function () {
        clearTimeout(timer);
        setShouldShow(false);
        removeMessageFromAreaMessages(eventName, id);
    }, [setShouldShow, eventName, id, timer]);
    useEffect(function () {
        if (timer === -1 && duration !== Infinity) {
            const newTimer = setTimeout(killMessage, duration);
            setTimer(newTimer);
        }
    }, [timer, setTimer, duration, killMessage]);
    return killMessage;
}
//# sourceMappingURL=hooks.js.map