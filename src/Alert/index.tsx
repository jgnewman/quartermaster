import "./styles.styl"
import React, { PureComponent } from "react"

import { buildClassNames } from "../lib/helpers"

import Grid, { Grow } from "../Grid"
import Icon from "../Icon"

export interface AlertProps {
  className?: string
  type: "danger" | "info" | "warning"
}

class Alert extends PureComponent<AlertProps> {
  static displayName = "Alert"

  render() {
    const {
      children,
      className,
      type,
    } = this.props

    const isDanger = type === "danger"
    const isInfo = type === "info"
    const isWarning = type === "warning"

    const typeClass = buildClassNames({ isDanger, isInfo, isWarning})
    const iconType = isDanger || isWarning ? "attn" : "info"

    return (
      <div className={`qmAlertContainer ${typeClass} ${className || ""}`}>
        <Grid className={`qmAlertGrid ${typeClass}`}>

          <Grow size={0} className="qmAlertIconWrapper">
            <Icon
              className={`qmAlertIcon ${typeClass}`}
              type={iconType}
              size="i"
            />
          </Grow>

          <Grow size={2} className="qmAlertContent">
            {children}
          </Grow>

        </Grid>
      </div>
    )
  }
}

export default Alert
