import React, { memo, useState, } from "react";
import { useToastListener, } from "./hooks";
import Toast from "./Toast";
function ToastList({ eventName, isBottom, }) {
    const [messages, setMessages] = useState([]);
    useToastListener(eventName, setMessages);
    return (React.createElement("div", { className: `qmToastList` }, messages.map(({ alignment, body, duration, id, isDismissible, type, }) => (React.createElement(Toast, { key: id, alignment: alignment, body: body, duration: duration, eventName: eventName, id: id, isBottom: isBottom, isDismissible: isDismissible, type: type })))));
}
ToastList.displayName = "ToastList";
export default memo(ToastList);
//# sourceMappingURL=ToastList.js.map