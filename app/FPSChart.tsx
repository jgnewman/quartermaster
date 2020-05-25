const BEST = "#52c02c"
const BETTER = "#9cd426"
const DECENT = "#fde017"
const WORSE = "#FDAB64"
const WORST = "#cf2e41"

function createElement(tag: string, attrs: any = {}, styles: any = {}): HTMLElement {
  const elem = document.createElement(tag)

  Object.keys(attrs).forEach(attrName => {
    elem.setAttribute(attrName, attrs[attrName])
  })

  Object.keys(styles).forEach(styleName => {
    elem.style[styleName] = styles[styleName]
  })

  return elem
}

interface ChartElems {
  chartWrapper: HTMLElement
  chart: HTMLElement
  text: HTMLElement
}

function appendChartStructure(): ChartElems {
  const chartWrapper = createElement("div", { "class": "fps-chart-wrapper" }, {
    width: "85px",
    display: "flex",
    "justify-content": "space-between",
    position: "fixed",
    bottom: "10px",
    right: "10px",
  })

  const chart = createElement("div", { "class": "fps-chart" }, {
    display: "flex",
    alignItems: "flex-end",
    "justify-content": "flex-start",
    width: "50px",
    height: "30px",
    background: "rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
    "border-radius": "3px",
  })

  const text = createElement("div", { "class": "fps-text" }, {
    width: "25px",
    "line-height": "1",
    "font-size": "13px",
  })

  chartWrapper.appendChild(chart)
  chartWrapper.appendChild(text)
  document.body.appendChild(chartWrapper)

  return { chartWrapper, chart, text }
}

function buildBar(fps: number): HTMLElement {
  const height = fps / 2
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

  return createElement("div", { "class" : "fps-bar" }, {
    background: color,
    width: "1px",
    height: `${height}px`,
  })
}

export function createFPSChart() {
  const { chart, text } = appendChartStructure()
  const bars: HTMLElement[] = []
  let meanCounter = 0
  let meanPoints = 0

  function addBar(fps: number) {
    const newBar = buildBar(fps)
    bars.length >= 50 && chart.removeChild(chart.childNodes[0])
    chart.appendChild(newBar)
    bars.push(newBar)
  }

  function updateAverage(fps: number) {
    addBar(fps)
    meanPoints += 1
    meanCounter += fps
    const avg = Math.round(meanCounter / meanPoints)
    text.innerHTML = avg + " FPS"
    if (meanPoints >= 3) {
      meanPoints = 0
      meanCounter = 0
    }
  }

  let begin = Date.now()
  let frames = 0
  function refresh() {
    const now = Date.now()
    frames += 1
    if (now - begin >= 1000) {
      updateAverage(frames)
      begin = now
      frames = 0
    }
    requestAnimationFrame(refresh)
  }

  requestAnimationFrame(refresh)
}

