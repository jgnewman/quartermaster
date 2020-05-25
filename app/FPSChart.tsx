import React, {
  memo,
  useEffect,
} from "react"

let chart: HTMLElement | null = null
let text: HTMLElement | null = null
const bars: HTMLElement[] = []
let meanCounter = 0
let meanPoints = 0

const BEST = "#52c02c"
const BETTER = "#9cd426"
const DECENT = "#fde017"
const WORSE = "#FDAB64"
const WORST = "#cf2e41"

function buildBar(fps: number): HTMLElement {
  const height = fps / 2
  const bar = document.createElement("div")
  let color = BEST

  if (fps < 59) {
    color = BETTER
  }

  if (fps < 55) {
    color = DECENT
  }

  if (fps < 50) {
    color = WORSE
  }

  if (fps < 40) {
    color = WORST
  }

  bar.style.background = color
  bar.style.width = "1px"
  bar.style.height = `${height}px`
  return bar
}

function addBar(fps: number) {
  if (chart) {
    const newBar = buildBar(fps)
    bars.length >= 100 && chart.removeChild(chart.childNodes[0])
    chart.appendChild(newBar)
    bars.push(newBar)
  }
}

function updateAverage(fps: number) {
  if (text) {
    meanPoints += 1
    meanCounter += fps
    if (meanPoints >= 10) {
      text.innerHTML = Math.round(meanCounter / meanPoints) + ""
      addBar(fps)
      meanPoints = 0
      meanCounter = 0
    }
  }
}

function FPSChart() {

  useEffect(() => {
    chart = document.querySelector("#fpschart")
    text = document.querySelector("#fpstext")

    let then = Date.now() / 1000 // get time in seconds
    function refresh() {
      const now = Date.now() / 1000 // get time in seconds

      // compute time since last frame
      const elapsedTime = now - then
      then = now

      // compute fps
      if (elapsedTime > 0) {
        const fps = Math.round(1 / elapsedTime)
        updateAverage(fps)
      }

      requestAnimationFrame(refresh)
    }

    refresh()
  }, [])

  return (
    <div id="fpschartwrapper" style={{
      width: "125px",
      display: "flex",
      justifyContent: "space-between",
      position: "fixed",
      bottom: 10,
      right: 10,
    }}>
      <div id="fpschart" style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        width: "100px",
        height: "30px",
        background: "transparent",
      }}/>
      <div id="fpstext"/>
    </div>
  )
}

FPSChart.displayName = "FPSChart"

export default memo(FPSChart)
