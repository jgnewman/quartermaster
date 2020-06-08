import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./types"
import IconWrapper from "./IconWrapper"

const tile1 = [
  "M0.25,0 L3,0 C3.13807119,0 3.25,0.111928813 3.25,0.25 L3.25,3 C3.25,3.13807119",
  "3.13807119,3.25 3,3.25 L0.25,3.25 C0.111928813,3.25 0,3.13807119 0,3 L0,0.25",
  "C0,0.111928813 0.111928813,0 0.25,0 Z",
].join(" ")

const tile2 = [
  "M5,0 L7.75,0 C7.88807119,0 8,0.111928813 8,0.25 L8,3 C8,3.13807119",
  "7.88807119,3.25 7.75,3.25 L5,3.25 C4.86192881,3.25 4.75,3.13807119 4.75,3",
  "L4.75,0.25 C4.75,0.111928813 4.86192881,0 5,0 Z",
].join(" ")

const tile3 = [
  "M0.25,4.75 L3,4.75 C3.13807119,4.75 3.25,4.86192881 3.25,5 L3.25,7.75",
  "C3.25,7.88807119 3.13807119,8 3,8 L0.25,8 C0.111928813,8 0,7.88807119",
  "0,7.75 L0,5 C0,4.86192881 0.111928813,4.75 0.25,4.75 Z",
].join(" ")

const tile4 = [
  "M5,4.75 L7.75,4.75 C7.88807119,4.75 8,4.86192881 8,5 L8,7.75 C8,7.88807119",
  "7.88807119,8 7.75,8 L5,8 C4.86192881,8 4.75,7.88807119 4.75,7.75 L4.75,5",
  "C4.75,4.86192881 4.86192881,4.75 5,4.75 Z",
].join(" ")

const Tiles = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  return (
    <IconWrapper
      {...props}
      disableStroke
      ref={ref}
      title={props.title || "Tiles icon"}>
      <path className="qmPathIsFilled" d={tile1}></path>
      <path className="qmPathIsFilled" d={tile2}></path>
      <path className="qmPathIsFilled" d={tile3}></path>
      <path className="qmPathIsFilled" d={tile4}></path>
    </IconWrapper>
  )
})

Tiles.displayName = "Tiles"

export default memo(Tiles)
