import "./styles.styl"

import React, {
  ReactNode,
  memo,
} from "react"

import { buildClassNames } from "../lib/helpers"

import Grid, { Grow } from "../Grid"
import Icon from "../Icon"

export interface AlertProps {
  children?: ReactNode
  className?: string
  type: "danger" | "info" | "warning"
}

function Alert({
  children,
  className,
  type,
}: AlertProps) {

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

Alert.displayName = "Alert"

export default memo(Alert)
