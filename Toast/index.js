import "./styles.css";
import React from "react";
import { render, } from "react-dom";
import { buildClassNames, createId, } from "../lib/helpers";
import { areaMessages, publish, } from "./helpers";
import ToastList from "./ToastList";
function assertToastAreaMounted(x, y) {
    const toastStyle = x + y;
    if (areaMessages[toastStyle]) {
        return;
    }
    areaMessages[toastStyle] = [];
    const areaClasses = buildClassNames({
        isLeft: x === "left",
        isCenter: x === "center",
        isRight: x === "right",
        isTop: y === "top",
        isBottom: y === "bottom",
    });
    const div = document.createElement("div");
    div.setAttribute("class", `qmToastAreaContainer ${areaClasses}`);
    document.body.appendChild(div);
    render(React.createElement(ToastList, { eventName: toastStyle, isBottom: y === "bottom" }), div);
}
export default function getToastArea(x = "right", y = "top") {
    assertToastAreaMounted(x, y);
    const eventName = x + y;
    return function (msg) {
        const publishData = Object.assign(Object.assign({}, msg), { id: createId(), alignment: x });
        publish(eventName, publishData);
    };
}
//# sourceMappingURL=index.js.map