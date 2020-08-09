export function getInitialSubmenuState(data, state = {}) {
    data.forEach(item => {
        if (item.type === "submenu") {
            state[item.key] = {
                isOpen: !!item.startOpen,
                hasToggled: false,
            };
        }
    });
    return state;
}
export function genAnimProps(animate, isOpen) {
    let animProps = { type: isOpen ? "fadeIn" : "fadeOut" };
    if (typeof animate === "object") {
        animProps = Object.assign(Object.assign({}, animProps), animate);
    }
    else if (!animate) {
        animProps.override = isOpen ? "show" : "hide";
    }
    return animProps;
}
//# sourceMappingURL=helpers.js.map