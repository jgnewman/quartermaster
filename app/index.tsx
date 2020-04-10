import "./styles.styl"
import React from "react"
import { render } from "react-dom"

import * as QM from "../src/index"
// import "../src/themes/Dark.styl"

class App extends React.Component {
  public static displayName = "App"

  public state = {
    modalOpen: false,
    counter: 0,
    fieldVal: "",
    boxChecked: false,
    toggleChecked: false,
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

  toggleToggle(evt: React.ChangeEvent) {
    this.setState({ toggleChecked: !this.state.toggleChecked })
    console.log("Toggled toggle with value", (evt.target as HTMLInputElement).value)
  }

  setRadioVal(evt: React.ChangeEvent) {
    this.setState({ radioVal: (evt.target as HTMLInputElement).value })
  }

  render() {
    return (
      <div style={{ padding: "1em 1em 5em", maxWidth: "500px" }}>
        <QM.Icon
          type="tiles"
          size={12}
        />

        <QM.Align>
          <QM.Avatar
            showActivity
            isActive={true}
            name="John Newman"
            // url="https://s.gravatar.com/avatar/cee1d21082337cc54cf9cf07339411e1?size=50&default=retro"
          />

          <QM.Button
            highlight="positive"
            clickHandler={this.openModal.bind(this)}>
            Open modal
          </QM.Button>

          <QM.ConfirmButton
            cancelText="No, decrement it!"
            disableHighlights={false}
            clickHandler={this.incrementCounter.bind(this)}
            postCancelHook={this.decrementCounter.bind(this)}>
            Increment counter
          </QM.ConfirmButton>
        </QM.Align>

        <div>
          <QM.Label text="Counter" />
          Here is a counter: {this.state.counter}
        </div>

        <QM.Modal
          isOpen={this.state.modalOpen}
          closeHandler={this.closeModal.bind(this)}>
          This is a modal
        </QM.Modal>

        <QM.TextField
          changeHandler={this.setFieldVal.bind(this)}
          charLimit={25}
          errorText="You have an error bro"
          hasError={this.state.fieldVal.length > 25}
          isDisabled={false}
          isRequired={true}
          label="My Input"
          placeholder="Say something here"
          preventInputAtLimit={false}
          type="text"
          value={this.state.fieldVal}
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

        <div>
          Rendering checked state as {String(this.state.boxChecked)}
        </div>

        <div>
          <QM.Toggle
            isDisabled={false}
            isChecked={this.state.toggleChecked}
            changeHandler={this.toggleToggle.bind(this)}
            value="My Toggle"
            label="Toggle me"
          />
        </div>

        <div>
          <QM.Checkbox
            isDisabled={false}
            isChecked={this.state.boxChecked}
            changeHandler={this.toggleCheckbox.bind(this)}
            value="My Checkbox"
            label="Check me"
          />
        </div>

        <div>
          <QM.RadioButton
            isChecked={this.state.radioVal === "foo"}
            changeHandler={this.setRadioVal.bind(this)}
            value="foo"
            label="Foo"
            groupName="my-radio-group"
          />
        </div>

        <div>
          <QM.RadioButton
            isChecked={this.state.radioVal === "bar"}
            changeHandler={this.setRadioVal.bind(this)}
            value="bar"
            label="Bar"
            groupName="my-radio-group"
          />
        </div>

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
              <QM.Grid wrap>
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
                <QM.RadioGroup
                  name="mygroup"
                  changeHandler={updateValueFor("mygroup")}
                  value={getFormState().mygroup}
                  options={[
                    { label: "Moo", value: "moo" },
                    { label: "Mar", value: "mar" },
                    { label: "Maz", value: "maz" },
                  ]}
                />
                <QM.RadioGroup
                  name="mygroup"
                  changeHandler={updateValueFor("mygroup")}
                  value={getFormState().mygroup}
                  options={[
                    { label: "Goo", value: "goo" },
                    { label: "Gar", value: "gar" },
                    { label: "Gaz", value: "gaz" },
                  ]}
                />
              </QM.Grid>
              <QM.Select
                label="My select menu"
                options={[
                  { label: "Foo", value: "foo" },
                  { label: "Bar", value: "bar" },
                  { label: "Baz", value: "baz" },
                ]}
                isDisabled={false}
                isRequired={true}
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

render(
  <App/>
 , document.querySelector("#app"))
