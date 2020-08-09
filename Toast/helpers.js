export const listeners = {};
export const areaMessages = {};
export function addMessageToAreaMessages(eventName, msg) {
    areaMessages[eventName] = [...areaMessages[eventName], msg];
}
export function removeMessageFromAreaMessages(eventName, id) {
    areaMessages[eventName] = areaMessages[eventName].filter(msg => msg.id !== id);
}
export function publish(eventName, msg) {
    if (listeners[eventName]) {
        addMessageToAreaMessages(eventName, msg);
        listeners[eventName].forEach(listener => listener(areaMessages[eventName]));
    }
}
export function subscribe(eventName, listener) {
    listeners[eventName] = listeners[eventName] || [];
    listeners[eventName].push(listener);
}
export function unsubscribe(eventName, listener) {
    if (listeners[eventName]) {
        listeners[eventName].splice(listeners[eventName].indexOf(listener), 1);
    }
}
//# sourceMappingURL=helpers.js.map