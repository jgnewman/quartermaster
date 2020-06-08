import "./styles.styl"
import React from "react"

import {
  render,
} from "react-dom"

import {
  buildClassNames,
  createId,
} from "../lib/helpers"

import type {
  PublishableMessage,
  XPos,
  YPos,
  ToastMessage,
} from "./types"

import {
  areaMessages,
  publish,
} from "./helpers"

import ToastList from "./ToastList"

function assertToastAreaMounted(x: XPos, y: YPos) {
  const toastStyle = x + y

  if (areaMessages[toastStyle]) {
    return
  }

  areaMessages[toastStyle] = []

  const areaClasses = buildClassNames({
    isLeft: x === "left",
    isCenter: x === "center",
    isRight: x === "right",
    isTop: y === "top",
    isBottom: y === "bottom",
  })

  const div = document.createElement("div")
  div.setAttribute("class", `qmToastAreaContainer ${areaClasses}`)
  document.body.appendChild(div)

  render(
    <ToastList
      eventName={toastStyle}
      isBottom={y === "bottom"}
    />,
    div,
  )
}

export default function getToastArea(x: XPos = "right", y: YPos = "top") {
  assertToastAreaMounted(x, y)
  const eventName = x + y

  return function (msg: PublishableMessage) {
    const publishData: ToastMessage = { ...msg, id: createId(), alignment: x }
    publish(eventName, publishData)
  }
}

// TODO: WRAP IN ALERT COMPONENT & DOCUMENT CHANGE

