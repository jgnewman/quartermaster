import { ThemeProps } from "../ThemeProvider"

type StrNum = string | number

export const DEFAULT_BG = "#efefef"
export const DEFAULT_RADIUS = "3px"
export const DEFAULT_BORDER = "1px solid black"
export const DEFAULT_OUTLINE = "0 0 0 1px blue"

interface Themed {
  theme: ThemeProps
}

export function theme(prop: keyof ThemeProps, fallback?: any) {
  return ({ theme }: Themed) => theme[prop] || fallback
}

export function blockAbs() {
  return "display: block; position: absolute;"
}

export function fixAbs() {
  return "display: block; position: fixed;"
}

export function size(w: StrNum = "auto", h: StrNum = w) {
  return `width: ${w}; height: ${h};`
}

export function absLT(l: StrNum = 0, t: StrNum = 0) {
  return `${blockAbs()} left: ${l}; top: ${t};`
}

export function absRT(r: StrNum = 0, t: StrNum = 0) {
  return `${blockAbs()} right: ${r}; top: ${t};`
}

export function absLB(l: StrNum = 0, b: StrNum = 0) {
  return `${blockAbs()} left: ${l}; bottom: ${b};`
}

export function absRB(r: StrNum = 0, b: StrNum = 0) {
  return `${blockAbs()} right: ${r}; bottom: ${b};`
}

export function absFill() {
  return `${absLT()} ${size("100%")}`
}

export function absCenter() {
  return `${absLT("50%", "50%")} transform: translateX(-50%) translateY(-50%);`
}

export function fixFill() {
  return `${fixAbs()} ${size("100%")} left: 0; top: 0;`
}

export function fixRT(r: StrNum = 0, t: StrNum = 0) {
  return `${fixAbs()} right: ${r}; top: ${t};`
}

export function vertMiddleInner() {
  return "vertical-align: middle;"
}

export function vertMiddle() {
  return `display: inline-block; ${vertMiddleInner()}`
}

export function circle(display?: string) {
  return `${display ? `display: ${display}; ` : ""}border-radius: 50%;`
}

export function borders(style: StrNum = DEFAULT_BORDER, radius: StrNum = "3px") {
  return `border: ${style}; box-sizing: border-box; border-radius: ${radius};`
}

export function bgImg(url: string) {
  return `background-image: url(${url}); background-repeat: no-repeat;`
}

export function coverBg(url?: string) {
  return `${url ? bgImg(url) : ""}background-size: cover; background-position: center; background-color: ${DEFAULT_BG};`
}

export function flex(ai = "stretch", jc = "space-between") {
  return `display: flex; align-items: ${ai}; justify-content: ${jc};`
}

export function ellipsisText() {
  return "overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
}
