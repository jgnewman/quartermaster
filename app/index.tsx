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
  DatePicker,
  Form,
  Grid,
  Heading,
  IconButton,
  Menu,
  Modal,
  Paragraph,
  Plus,
  RadioButton,
  RadioGroup,
  Select,
  Slider,
  Space,
  Spinner,
  Tag,
  Text,
  TextField,
  Tiles,
  Theme,
  Toggle,
  getToastArea,
} from "../src/index"

import DarkTheme from "../src/themes/Dark"

import { createFPSChart } from "./FPSChart"
createFPSChart()

interface AppState {
  modalOpen: boolean
  counter: number
  fieldVal: string
  boxChecked: boolean
  toggleChecked: boolean
  radioVal: string
  darkThemeEnabled: boolean
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

  openModal = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  incrementCounter = () => {
    this.setState({ counter: this.state.counter + 1 })
  }

  decrementCounter = () => {
    this.setState({ counter: this.state.counter - 1 })
  }

  setFieldVal = (evt: React.ChangeEvent) => {
    this.setState({ fieldVal: (evt.target as HTMLInputElement).value })
  }

  toggleCheckbox = (evt: React.ChangeEvent) => {
    this.setState({ boxChecked: !this.state.boxChecked })
    console.log("Toggled checkbox with value", (evt.target as HTMLInputElement).value)
  }

  toggleToggle = (evt: React.ChangeEvent) => {
    this.setState({ toggleChecked: !this.state.toggleChecked })
    console.log("Toggled toggle with value", (evt.target as HTMLInputElement).value)
  }

  setRadioVal = (evt: React.ChangeEvent) => {
    this.setState({ radioVal: (evt.target as HTMLInputElement).value })
  }

  toggleTheme = () => {
    this.setState({ darkThemeEnabled: !this.state.darkThemeEnabled })
  }

  fireToast = () => {
    const showToast = getToastArea()
    showToast({
      body: "Here is your toast!",
      duration: 10000,
      isDismissible: true,
      type: "success",
    })
  }

  launchToasts() {
    const showToast = getToastArea()

    setTimeout(() => {
      showToast({
        body: "Hi there! I hope you're having a good day. Feel free to stick around and explore!",
        duration: 10000,
        isDismissible: true,
      })
    }, 1000)

    setTimeout(() => {
      showToast({
        body: "And don't forget to subscribe!",
      })
    }, 2000)
  }

  componentDidMount() {
    this.launchToasts()
  }

  render() {
    return (
      <Theme data={this.state.darkThemeEnabled ? DarkTheme : null}>
        <div style={{ padding: "1em 1em 5em", maxWidth: "500px" }}>

          <Heading size={1} text="Welcome to Quartermaster!"/>
          <Paragraph>
            Quartermaster is a library of common components that
            are useful in building React apps with Typescript.
          </Paragraph>

          <Align bottomSpace="l" topSpace="s" gutterSpace="i">
            <Animation
              type="fadeIn"
              direction="left"
              duration={1000}>
              <Button
                text="Toggle Theme"
                isCompact={true}
                clickHandler={this.toggleTheme}
              />
            </Animation>

            <Tag
              text={`${this.state.darkThemeEnabled ? "dark" : "light"} theme`}
              color="green"
            />

            <Text text="Hello, world!"/>

            <Button
              text="10s Toast"
              isCompact={true}
              clickHandler={this.fireToast}
            />
          </Align>

          <Space bottom="l">
            <Menu
              maxWidth="200px"
              isLifted={true}
              isCompact={true}
              isOpen={true}
              animate={false}
              data={[
                {type: "label", text: "Section 1"},
                {type: "link", text: "Google", href: "https://google.com"},
                {type: "link", text: "Yahoo", href: "https://yahoo.com", isActive: true},
                {
                  key: "foo",
                  type: "submenu",
                  text: "Submenu",
                  animate: { inDirection: "down", outDirection: "up" },
                  startOpen: false,
                  isCollapsible: true,
                  data: [
                    {type: "label", text: "Submenu 1"},
                    {type: "link", text: "Wikipedia", href: "https://wikipedia.com"},
                    {type: "link", text: "W3Schools", href: "https://w3schools.com"},
                    {
                      key: "bar",
                      type: "submenu",
                      text: "Submenu 2",
                      animate: { inDirection: "down", outDirection: "up" },
                      startOpen: false,
                      isCollapsible: true,
                      data: [
                        {type: "label", text: "Submenu 2"},
                        {type: "link", text: "Wikipedia", href: "https://wikipedia.com"},
                        {type: "link", text: "W3Schools", href: "https://w3schools.com"},
                      ],
                    },
                  ],
                },
                {type: "separator"},
                {type: "label", text: "Section 2"},
                {type: "link", text: "Bing", href: "https://bing.com"},
                {type: "link", text: "Duck Duck Go", href: "https://duckduckgo.com"},
              ]}
            />
          </Space>

          <Align bottomSpace="l" gutterSpace="i">
            <Spinner size="i" />

            <Tiles
              size="xs"
              rotate={45}
            />

            <IconButton>
              <Plus size="m" />
            </IconButton>

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
              clickHandler={this.openModal}>
              Open modal
            </Button>

            <ConfirmButton
              cancelText="No, decrement it!"
              disableHighlights={false}
              isCompact={true}
              useCompactModalButtons={true}
              skipConfirmation={this.state.counter > 0 && this.state.counter < 3}
              clickHandler={this.incrementCounter}
              postCancelHook={this.decrementCounter}>
              Increment counter
            </ConfirmButton>
          </Align>

          <Space bottom="l">
            <Alert
             type="warning"
             text={`Here is a counter: ${this.state.counter}`}
            />
          </Space>

          <Modal
            isOpen={this.state.modalOpen}
            closeHandler={this.closeModal}>
            This is a modal
          </Modal>

          <Paragraph>
            When you type inside one of the fields below, you will see your
            text duplicated within the other field as well.
          </Paragraph>

          <Paragraph>
            It will be pretty cool and I hope you like the effect when you see it.
          </Paragraph>

          <Space bottom="l">
            <TextField
              changeHandler={this.setFieldVal}
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
              changeHandler={this.setFieldVal}
              errorText=""
            />
          </Space>

          <Paragraph>
            Rendering checked state as {String(this.state.boxChecked)}
          </Paragraph>

          <div>
            <Toggle
              isDisabled={false}
              isChecked={this.state.toggleChecked}
              changeHandler={this.toggleToggle}
              value="My Toggle"
              label="Toggle me"
            />
          </div>

          <div>
            <Checkbox
              isDisabled={false}
              isChecked={this.state.boxChecked}
              changeHandler={this.toggleCheckbox}
              value="My Checkbox"
              label="Check me"
            />
          </div>

          <div>
            <RadioButton
              isChecked={this.state.radioVal === "foo"}
              changeHandler={this.setRadioVal}
              value="foo"
              label="Foo"
              groupName="my-radio-group"
            />
          </div>

          <div>
            <RadioButton
              isChecked={this.state.radioVal === "bar"}
              changeHandler={this.setRadioVal}
              value="bar"
              label="Bar"
              groupName="my-radio-group"
            />
          </div>

          <Form initialState={{
            mytext: "",
            mygroup: "foo",
            myselect: null,
            mydate: [Date.now(), Date.now() + (1000 * 60 * 60 * 24 * 5)],
            myslider: 5,
          }}>
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

                <Space bottom="l">
                  <DatePicker
                    changeHandler={updateValueFor("mydate")}
                    disablePast={true}
                    enableRange={true}
                    enableTimes={true}
                    isCompact={false}
                    isDisabled={false}
                    isRequired={true}
                    label="Pick a date v2!"
                    placeholder="Pick a date!"
                    position="bottom"
                    timeIncrement={30}
                    value={formState.mydate}
                    weekStartsOnMonday={false}
                  />
                </Space>

                <Grid wrap gutterW="l" gutterH="l" bottomSpace="l">
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
                    position="top"
                    value={formState.myselect}
                    changeHandler={updateValueFor("myselect")}
                  />
                </Space>

                <Space bottom="l">
                  <Slider
                    label="This is my slider"
                    changeHandler={updateValueFor("myslider")}
                    hasTicks={true}
                    min={1}
                    max={10}
                    isCompact={false}
                    value={formState.myslider}
                    formatValue={n => `${n} units`}
                  />
                </Space>

                <Button
                  clickHandler={() => console.log(formState)}>
                  Log form data
                </Button>
              </>
            )}
          </Form>

        </div>
      </Theme>
    )
  }
}

render(<App/>, document.querySelector("#app"))

