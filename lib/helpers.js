export function noopEvtHandler() { return; }
function getInputSetter(elemType, propName) {
    const proto = window[elemType].prototype;
    return Object.getOwnPropertyDescriptor(proto, propName).set;
}
export function manuallySetFieldValue(ref, value, isTextArea, events = []) {
    const inputSetter = getInputSetter(isTextArea ? "HTMLTextAreaElement" : "HTMLInputElement", "value");
    inputSetter.call(ref, value);
    events.forEach(evtName => ref.dispatchEvent(new Event(evtName, { bubbles: true, cancelable: true })));
}
export function manuallyTickCheckbox(ref) {
    ref.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
}
export function manuallyTickRadioButton(ref) {
    ref.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
}
export function buildClassNames(options) {
    const classes = [];
    Object.keys(options).forEach(key => options[key] && classes.push(key));
    return classes.join(" ");
}
export function createId() {
    return `qm-${String(Date.now()).slice(9)}-${String(Math.random()).slice(2, 6)}`;
}
const body = window.document.body;
let scrollingEnabled = true;
let originalBodyHeight = body.style.height;
let originalBodyOverflow = body.style.overflow;
export function disableScrolling() {
    if (scrollingEnabled) {
        originalBodyHeight = body.style.height;
        originalBodyOverflow = body.style.overflow;
        body.style.height = "100%";
        body.style.overflow = "hidden";
        scrollingEnabled = false;
    }
}
export function enableScrolling() {
    if (!scrollingEnabled) {
        body.style.height = originalBodyHeight;
        body.style.overflow = originalBodyOverflow;
        scrollingEnabled = true;
    }
}
//# sourceMappingURL=helpers.js.map