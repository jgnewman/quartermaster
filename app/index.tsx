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
    boxChecked: false,
    radioVal: "foo",
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

  toggleCheckbox(evt: React.ChangeEvent) {
    this.setState({ boxChecked: !this.state.boxChecked })
    console.log("Toggled checkbox with value", (evt.target as HTMLInputElement).value)
  }

  setRadioVal(evt: React.ChangeEvent) {
    this.setState({ radioVal: (evt.target as HTMLInputElement).value })
  }

  render() {
    return (
      <div style={{ padding: "1em", maxWidth: "500px" }}>

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

        <div>
          Here is a counter: {this.state.counter}
        </div>

        <QM.Modal
          isOpen={this.state.modalOpen}
          closeHandler={this.closeModal.bind(this)}>
          This is a modal
        </QM.Modal>

        <QM.TextField
          label="My Input"
          type="text"
          isDisabled={false}
          placeholder="Say something here"
          charLimit={25}
          preventInputAtLimit={false}
          value={this.state.fieldVal}
          changeHandler={this.setFieldVal.bind(this)}
          errorText=""
        />

        <QM.TextField
          label="My Textarea"
          type="textarea"
          isDisabled={false}
          placeholder="Say something here"
          charLimit={150}
          preventInputAtLimit={true}
          value={this.state.fieldVal}
          changeHandler={this.setFieldVal.bind(this)}
          errorText=""
        />

        <QM.CharLimitCounter
          limit={150}
          count={this.state.fieldVal.length}
        />

        <div>
          This is the field value: {this.state.fieldVal}
        </div>

        <div>
          Rendering checked state as {String(this.state.boxChecked)}
        </div>

        <QM.Checkbox
          isChecked={this.state.boxChecked}
          changeHandler={this.toggleCheckbox.bind(this)}
          value="My Checkbox"
          label="Check me"
        />

        <QM.RadioButton
          isChecked={this.state.radioVal === "foo"}
          changeHandler={this.setRadioVal.bind(this)}
          value="foo"
          label="Foo"
          groupName="my-radio-group"
        />

        <QM.RadioButton
          isChecked={this.state.radioVal === "bar"}
          changeHandler={this.setRadioVal.bind(this)}
          value="bar"
          label="Bar"
          groupName="my-radio-group"
        />

        <QM.Form initialState={{ mytext: "", mygroup: "foo", myselect: null }}>
          {({ getFormState, updateValueFor }) => (
            <>
              <QM.TextField
                label="Form Text field"
                type="text"
                placeholder="Say something here"
                value={getFormState().mytext}
                changeHandler={updateValueFor("mytext")}
              />
              <QM.RadioGroup
                name="mygroup"
                changeHandler={updateValueFor("mygroup")}
                value={getFormState().mygroup}
                options={[
                  { label: "Foo", value: "foo" },
                  { label: "Bar", value: "bar" },
                  { label: "Baz", value: "baz" },
                ]}
              />
              <QM.Select
                label="My select menu"
                options={[
                  { label: "Foo", value: "foo" },
                  { label: "Bar", value: "bar" },
                  { label: "Baz", value: "baz" },
                ]}
                value={getFormState().myselect}
                changeHandler={updateValueFor("myselect")}
              />
              <QM.Button
                clickHandler={() => console.log(getFormState())}>
                Log form data
              </QM.Button>
            </>
          )}
        </QM.Form>

      </div>
    )
  }
}

render(<App/>, document.querySelector("#app"))
