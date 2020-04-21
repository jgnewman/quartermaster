import "./styles.styl"
import React, { PureComponent } from "react"

import { DynamicProps } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"

import Animation, { AnimationProps } from "../Animation"
import Icon from "../Icon"
import Label from "../Label"
import Space from "../Space"

interface LabelData {
  text: string
  type: "label"
}

interface LinkData {
  clickHandler?: React.MouseEventHandler
  component?: Function
  href?: string
  isActive?: boolean
  text: string
  type: "link"
}

interface SubAnimate {
  inDirection?: "left" | "right" | "up" | "down"
  outDirection?: "left" | "right" | "up" | "down"
  inDuration?: number
  outDuration?: number
}

interface SubmenuData {
  animate?: boolean | SubAnimate
  data: Data[]
  key: string | number
  isCollapsible?: boolean
  isLifted?: boolean
  maxWidth?: string
  minWidth?: string
  posX?: "left" | "right"
  posY?: "top" | "bottom"
  startOpen?: boolean
  text: string
  type: "submenu"
}

interface SeparatorData {
  type: "separator"
}

type Data = LabelData | LinkData | SeparatorData | SubmenuData

interface MenuState {
  [key: string]: {
    isOpen: boolean
    hasToggled: boolean
  }
}

export interface MenuProps {
  animate?: boolean | Pick<AnimationProps, "direction" | "duration">
  className?: string
  data: Data[]
  isCompact?: boolean
  isLifted?: boolean
  isOpen: boolean
  maxWidth?: string
  minWidth?: string
}

class Menu extends PureComponent<MenuProps, MenuState> {
  static displayName = "Menu"
  public state: MenuState
  private menuRef: HTMLDivElement | null

  constructor(props: MenuProps) {
    super(props)
    this.state = this.getInitialSubmenuState(props.data)
  }

  menuRefFn = (elem: HTMLDivElement | null) => {
    this.menuRef = elem
  }

  closeMenuOnClickAway = (evt: any) => {
    const refExists = !!this.menuRef
    const refInPath = refExists && evt.path.includes(this.menuRef)

    if (refInPath) {
      return
    }

    const newState: MenuState = {}

    Object.keys(this.state).forEach(key => {
      const { isOpen, hasToggled } = this.state[key]
      if (isOpen && hasToggled) {
        newState[key] = { isOpen: false, hasToggled }
      }
    })

    this.setState(newState)
  }

  getInitialSubmenuState(data: Data[], state: MenuState = {}): MenuState {
    data.forEach(item => {
      if (item.type === "submenu") {
        state[item.key] = {
          isOpen: !!item.startOpen,
          hasToggled: false,
        }
      }
    })
    return state
  }

  genAnimProps() {
    const { animate, isOpen } = this.props
    let animProps: AnimationProps = { type: isOpen ? "fadeIn" : "fadeOut" }

    if (typeof animate === "object") {
      animProps = { ...animProps, ...animate }
    } else if (!animate) {
      animProps.override = isOpen ? "show" : "hide"
    }

    return animProps
  }

  buildLabel({ text }: LabelData, key: number) {
    const { isCompact } = this.props
    const largePad = isCompact ? "m" : "l"
    const smallPad = isCompact ? "xs" : "s"

    return (
      <Space
        key={key}
        className="qmMenuLabelWrapper"
        bottom={smallPad}
        right={largePad}
        left={largePad}>
        <Label className="qmMenuLabel" text={text} />
      </Space>
    )
  }

  buildLink({
    clickHandler,
    component: CustomComponent,
    href,
    text,
    isActive,
  }: LinkData, key: number) {

    const { isCompact } = this.props
    const smallPad = isCompact ? "xs" : "s"
    const largePad = isCompact ? "m" : "l"

    const linkAttrs: DynamicProps = {
      className: "qmMenuLink",
    }

    if (clickHandler) {
      linkAttrs.onClick = clickHandler
    }

    if (href) {
      linkAttrs.href = href
    }

    const iconClasses = buildClassNames({ isCompact })

    const content = (
      <Space
        className="qmMenuLinkContent"
        top={smallPad}
        right={largePad}
        bottom={smallPad}
        left={largePad}>

        <span className="qmMenuLinkText">
          {text}
        </span>

        {isActive && (
          <Icon
            className={`qmMenuActiveIcon ${iconClasses}`}
            type="dot"
            size="xs"
          />
        )}
      </Space>
    )

    return CustomComponent
      ? <CustomComponent key={key} {...linkAttrs}>{content}</CustomComponent>
      : <a key={key} {...linkAttrs}>{content}</a>
  }

  buildSubmenu(menuData: SubmenuData, key: number) {
    const {
      animate,
      data,
      key: menuKey,
      isCollapsible,
      isLifted: childIsLifted,
      maxWidth,
      minWidth,
      posX = "right",
      posY = "bottom",
      startOpen,
      text,
    } = menuData

    const {
      isCompact,
      isLifted: parentIsLifted,
    } = this.props

    const isLifted = typeof childIsLifted === "boolean" ? childIsLifted : !!parentIsLifted
    const { isOpen, hasToggled } = this.state[menuKey]
    const smallPad = isCompact ? "xs" : "s"
    const largePad = isCompact ? "m" : "l"

    const stopper = (evt: React.MouseEvent) => evt.stopPropagation()

    const clickHandler = !isCollapsible ? stopper : (evt: React.MouseEvent) => {
      stopper(evt)
      this.setState({
        [menuKey]: {
          isOpen: !isOpen,
          hasToggled: true,
        },
      })
    }

    const animProps: boolean | AnimationProps = animate === true ? true : !animate ? false : {
      type: isOpen ? "fadeIn" : "fadeOut",
    }

    if (typeof animate === "object" && typeof animProps === "object") {
      if (isOpen && animate.inDirection) {
        animProps.direction = animate.inDirection
      }

      if (isOpen && animate.inDuration) {
        animProps.duration = animate.inDuration
      }

      if (!isOpen && animate.outDirection) {
        animProps.direction = animate.outDirection
      }

      if (!isOpen && animate.outDuration) {
        animProps.duration = animate.outDuration
      }

      if (startOpen && !hasToggled) {
        animProps.override = "show"
      }

      if (!startOpen && !hasToggled) {
        animProps.override = "hide"
      }
    }

    const canAnimate = !!animProps
    const isMenuBottom = posY === "bottom"
    const isMenuTop = !isMenuBottom

    const buttonClasses = buildClassNames({
      isCollapsible,
    })

    const iconClasses = buildClassNames({
      isCompact,
      isFlipped: (isOpen && isMenuBottom) || (!isOpen && isMenuTop),
    })

    const menuClasses = buildClassNames({
      canAnimate,
      isCollapsible,
      isMenuBottom,
      isMenuLeft: posX === "left",
      isMenuRight: posX === "right",
      isMenuTop,
    })

    return (
      <div key={key} className={`qmMenuSubmenuLink ${buttonClasses}`} onClick={clickHandler}>
        <Space
          className="qmMenuLinkContent"
          top={smallPad}
          right={largePad}
          bottom={smallPad}
          left={largePad}>

          <span className="qmMenuLinkText">
            {text}
          </span>

          {canAnimate && (
            <Icon
              className={`qmMenuSubmenuIcon ${iconClasses}`}
              type="triangle"
              size="xs"
            />
          )}

        </Space>

        <Menu
          className={`qmMenuSubmenu ${menuClasses}`}
          animate={animProps}
          data={data}
          isCompact={isCompact}
          isLifted={isLifted}
          isOpen={isOpen}
          maxWidth={maxWidth}
          minWidth={minWidth}
        />
      </div>
    )
  }

  buildSeparator(_: SeparatorData, key: number) {
    const { isCompact } = this.props
    const paddingSize = isCompact ? "xs" : "s"

    return (
      <Space
        key={key}
        className="qmMenuSeparatorWrapper"
        bottom={paddingSize}>
        <hr className="qmMenuSeparator" />
      </Space>
    )
  }

  buildMenuItem(data: Data, key: number) {
    switch (data.type) {

      case "label":
        return this.buildLabel(data, key)

      case "link":
        return this.buildLink(data, key)

      case "submenu":
        return this.buildSubmenu(data, key)

      case "separator":
      default:
        return this.buildSeparator(data, key)

    }
  }

  componentDidMount() {
    document.addEventListener("click", this.closeMenuOnClickAway)
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.closeMenuOnClickAway)
  }

  render() {
    const {
      className,
      data,
      isCompact,
      isLifted,
      isOpen,
      minWidth,
      maxWidth,
    } = this.props

    const animProps = this.genAnimProps()

    const style = {
      minWidth: minWidth || "initial",
      maxWidth: maxWidth || "initial",
    }

    const helperClasses = buildClassNames({
      isCompact,
      isLifted,
      isOpen,
    })

    return (
      <Animation
        elemRef={this.menuRefFn}
        className={`qmMenuContainer ${helperClasses} ${className || ""}`}
        style={style}
        {...animProps}>
        {data.map((item, index) => this.buildMenuItem(item, index))}
      </Animation>
    )
  }
}

export default Menu
