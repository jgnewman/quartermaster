import "./styles.styl"
import React from "react"
import { render } from "react-dom"

import {
  Alert,
  Align,
  Animation,
  Avatar,
  Button,
  Checkbox,
  ConfirmButton,
  Form,
  Grid,
  Icon,
  IconButton,
  Modal,
  RadioButton,
  RadioGroup,
  Select,
  Space,
  Spinner,
  TextField,
  Theme,
  Toggle,
  Menu,
} from "../src/index"

import DarkTheme from "../src/themes/Dark"

interface AppState {
  modalOpen: boolean
  counter: number
  fieldVal: string
  boxChecked: boolean
  toggleChecked: boolean
  radioVal: string
  darkThemeEnabled: false
}

class App extends React.Component {
  public static displayName = "App"

  public state: AppState = {
    modalOpen: false,
    counter: 0,
    fieldVal: "",
    boxChecked: false,
    toggleChecked: false,
    radioVal: "foo",
    darkThemeEnabled: false,
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

  toggleTheme() {
    this.setState({ darkThemeEnabled: !this.state.darkThemeEnabled })
  }

  render() {
    return (
      <Theme data={this.state.darkThemeEnabled ? DarkTheme : null}>
        <div style={{ padding: "1em 1em 5em", maxWidth: "500px" }}>

          <Space bottom="l">
            <Button
              text="Toggle Theme"
              isCompact={true}
              clickHandler={this.toggleTheme.bind(this)}
            />
          </Space>

          <Align bottomSpace="l">
            <Spinner
              size="i"
            />

            <Icon
              type="tiles"
              size="xxs"
              rotate={45}
            />

            <IconButton
              type="plus"
              size="s"
            />

            <Avatar
              showActivity
              isActive={true}
              name="John Newman"
              isCompact={true}
              // url="https://s.gravatar.com/avatar/cee1d21082337cc54cf9cf07339411e1?size=50&default=retro"
            />

            <Button
              highlight="positive"
              isCompact={true}
              clickHandler={this.openModal.bind(this)}>
              Open modal
            </Button>

            <ConfirmButton
              cancelText="No, decrement it!"
              disableHighlights={false}
              isCompact={true}
              useCompactModalButtons={true}
              skipConfirmation={this.state.counter > 0}
              clickHandler={this.incrementCounter.bind(this)}
              postCancelHook={this.decrementCounter.bind(this)}>
              Increment counter
            </ConfirmButton>
          </Align>

          <Space bottom="l">
            <Alert type="info">
              Here is a counter: {this.state.counter}
            </Alert>
          </Space>

          <Modal
            isOpen={this.state.modalOpen}
            closeHandler={this.closeModal.bind(this)}>
            This is a modal
          </Modal>

          <Space bottom="l">
            <TextField
              changeHandler={this.setFieldVal.bind(this)}
              charLimit={25}
              errorText="You have an error bro"
              hasError={this.state.fieldVal.length > 25}
              isCompact={false}
              isDisabled={false}
              isRequired={true}
              label="My Input"
              placeholder="Say something here"
              preventInputAtLimit={false}
              type="text"
              value={this.state.fieldVal}
            />
          </Space>

          <Space bottom="l">
            <TextField
              label="My Textarea"
              type="textarea"
              isCompact={false}
              isDisabled={false}
              placeholder="Say something here"
              charLimit={150}
              preventInputAtLimit={true}
              value={this.state.fieldVal}
              changeHandler={this.setFieldVal.bind(this)}
              errorText=""
            />
          </Space>

          <div>
            Rendering checked state as {String(this.state.boxChecked)}
          </div>

          <div>
            <Toggle
              isDisabled={false}
              isChecked={this.state.toggleChecked}
              changeHandler={this.toggleToggle.bind(this)}
              value="My Toggle"
              label="Toggle me"
            />
          </div>

          <div>
            <Checkbox
              isDisabled={false}
              isChecked={this.state.boxChecked}
              changeHandler={this.toggleCheckbox.bind(this)}
              value="My Checkbox"
              label="Check me"
            />
          </div>

          <div>
            <RadioButton
              isChecked={this.state.radioVal === "foo"}
              changeHandler={this.setRadioVal.bind(this)}
              value="foo"
              label="Foo"
              groupName="my-radio-group"
            />
          </div>

          <div>
            <RadioButton
              isChecked={this.state.radioVal === "bar"}
              changeHandler={this.setRadioVal.bind(this)}
              value="bar"
              label="Bar"
              groupName="my-radio-group"
            />
          </div>

          <Form initialState={{ mytext: "", mygroup: "foo", myselect: null }}>
            {({ formState, updateValueFor }) => (
              <>
                <Space bottom="l">
                  <TextField
                    label="Form Text field"
                    type="text"
                    placeholder="Say something here"
                    value={formState.mytext}
                    changeHandler={updateValueFor("mytext")}
                  />
                </Space>

                <Grid wrap>
                  <RadioGroup
                    name="mygroup"
                    changeHandler={updateValueFor("mygroup")}
                    value={formState.mygroup}
                    options={[
                      { label: "Foo", value: "foo" },
                      { label: "Bar", value: "bar" },
                      { label: "Baz", value: "baz" },
                    ]}
                  />

                  <RadioGroup
                    name="mygroup"
                    changeHandler={updateValueFor("mygroup")}
                    value={formState.mygroup}
                    options={[
                      { label: "Moo", value: "moo" },
                      { label: "Mar", value: "mar" },
                      { label: "Maz", value: "maz" },
                    ]}
                  />

                  <RadioGroup
                    name="mygroup"
                    changeHandler={updateValueFor("mygroup")}
                    value={formState.mygroup}
                    options={[
                      { label: "Goo", value: "goo" },
                      { label: "Gar", value: "gar" },
                      { label: "Gaz", value: "gaz" },
                    ]}
                  />
                </Grid>

                <Space bottom="l">
                  <Select
                    label="My select menu"
                    options={[
                      { label: "Foo", value: "foo" },
                      { label: "Bar", value: "bar" },
                      { label: "Baz", value: "baz" },
                    ]}
                    isCompact={false}
                    isDisabled={false}
                    isRequired={true}
                    value={formState.myselect}
                    changeHandler={updateValueFor("myselect")}
                  />
                </Space>

                <Button
                  clickHandler={() => console.log(formState)}>
                  Log form data
                </Button>
              </>
            )}
          </Form>

          <Animation
            type="fadeIn"
            direction="down">
            <Menu
              maxWidth="200px"
              isLifted={true}
              isCompact={true}
              data={[
                {type: "label", text: "Section 1"},
                {type: "link", text: "Google", href: "https://google.com", isActive: true},
                {type: "link", text: "Yahoo", href: "https://yahoo.com"},
                {type: "separator"},
                {type: "label", text: "Section 2"},
                {type: "link", text: "Bing", href: "https://bing.com"},
                {type: "link", text: "Duck Duck Go", href: "https://duckduckgo.com"},
              ]}
            />
          </Animation>

        </div>
      </Theme>
    )
  }
}

render(
  <App/>
 , document.querySelector("#app"))
