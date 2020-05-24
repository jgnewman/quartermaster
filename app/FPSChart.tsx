import React, {
  memo,
  useEffect,
} from "react"

let chart: HTMLElement | null = null
let text: HTMLElement | null = null
const bars: HTMLElement[] = []

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

function FPSChart() {

  useEffect(() => {
    chart = document.querySelector("#fpschart")
    text = document.querySelector("#fpstext")
    const times: number[] = []
    let fps

    function refreshLoop() {
      window.requestAnimationFrame(() => {
        const now = performance.now()
        while (times.length > 0 && times[0] <= now - 1000) {
          times.shift()
        }
        times.push(now)
        fps = times.length
        addBar(fps)
        if (text) {
          text.innerHTML = fps + ""
        }
        refreshLoop()
      })
    }

    refreshLoop()
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