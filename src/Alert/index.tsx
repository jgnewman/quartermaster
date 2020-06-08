import "./styles.styl"

import React, {
  ReactNode,
  memo,
} from "react"

import { buildClassNames } from "../lib/helpers"

import Grid, { Grow } from "../Grid"
import Text from "../Text"
import Attn from "../icons/Attn"
import Info from "../icons/Info"

export interface AlertProps {
  children?: ReactNode
  className?: string
  text?: string
  type: "danger" | "info" | "warning"
}

function Alert({
  children,
  className,
  text,
  type,
}: AlertProps) {

  const isDanger = type === "danger"
  const isInfo = type === "info"
  const isWarning = type === "warning"

  const typeClass = buildClassNames({ isDanger, isInfo, isWarning})
  const IconComponent = isDanger || isWarning ? Attn : Info

  return (
    <div className={`qmAlertContainer ${typeClass} ${className || ""}`}>
      <Grid className={`qmAlertGrid ${typeClass}`} gutterW="m">

        <Grow size={0} className="qmAlertIconWrapper">
          <IconComponent
            className={`qmAlertIcon ${typeClass}`}
            size="i"
          />
        </Grow>

        <Grow size={2} className="qmAlertContent">
          {text && <Text isBlock>{text}</Text>}
          {children}
        </Grow>

      </Grid>
    </div>
  )
}

Alert.displayName = "Alert"

export default memo(Alert)
