import "./styles.styl"
import React from "react"
import { render } from "react-dom"

import * as QM from "../src/index"

function App() {
  return (
    <div>
      <QM.Modal isOpen={true}>This is a modal</QM.Modal>
    </div>
  )
}
App.displayName = "App"

render(<App/>, document.querySelector("#app"))
