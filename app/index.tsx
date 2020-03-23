import "./styles.styl"
import React from "react"
import { render } from "react-dom"

import * as QM from "../src/index"

class App extends React.Component {
  public static displayName = "App"

  public state = {
    modalOpen: false,
    counter: 0,
  }

  openModal() {
    this.setState({ modalOpen: true })
  }

  closeModal() {
    this.setState({ modalOpen: false })
  }

  incrementCounter() {
    this.setState({ counter: this.state.counter + 1 })
  }

  render() {
    return (
      <div>

        <QM.Button
          clickHandler={this.openModal.bind(this)}>
          Click me to open modal
        </QM.Button>

        <QM.ConfirmButton
          clickHandler={this.incrementCounter.bind(this)}>
          Click me to increment counter
        </QM.ConfirmButton>

        <QM.Modal
          isOpen={this.state.modalOpen}
          closeHandler={this.closeModal.bind(this)}>
          This is a modal
        </QM.Modal>

        <div>
          Here is a counter: {this.state.counter}
        </div>

      </div>
    )
  }
}

render(<App/>, document.querySelector("#app"))
