import "./styles.styl"
import React from "react"
import { render } from "react-dom"

import * as QM from "../src/index"

class App extends React.Component {
  public static displayName = "App"

  public state = {
    modalOpen: false,
    counter: 0,
    fieldVal: "",
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

  decrementCounter() {
    this.setState({ counter: this.state.counter - 1 })
  }

  setFieldVal(evt: React.ChangeEvent) {
    this.setState({ fieldVal: (evt.target as HTMLInputElement).value })
  }

  render() {
    return (
      <div>

        <QM.Avatar
          showActivity
          isActive
          url="https://s.gravatar.com/avatar/cee1d21082337cc54cf9cf07339411e1?size=50&default=retro"
        />

        <QM.Button
          clickHandler={this.openModal.bind(this)}>
          Click me to open modal
        </QM.Button>

        <QM.ConfirmButton
          cancelText="No, decrement it!"
          clickHandler={this.incrementCounter.bind(this)}
          postCancelHook={this.decrementCounter.bind(this)}>
          Click me to increment counter
        </QM.ConfirmButton>

        <QM.Modal
          isOpen={this.state.modalOpen}
          closeHandler={this.closeModal.bind(this)}>
          This is a modal
        </QM.Modal>

        <QM.TextField
          label="My Label"
          type="text"
          disabled={false}
          placeholder="Say something here"
          charLimit={25}
          preventInputAtLimit={true}
          value={this.state.fieldVal}
          changeHandler={this.setFieldVal.bind(this)}
          errorText=""
        />

        <div>
          This is the field value: {this.state.fieldVal}
        </div>

        <div>
          Here is a counter: {this.state.counter}
        </div>

      </div>
    )
  }
}

render(<App/>, document.querySelector("#app"))
