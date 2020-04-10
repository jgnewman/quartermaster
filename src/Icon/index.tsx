import "./styles.styl"
import React, { PureComponent } from "react"

export type IconType = "caret"
                      | "checkmark"
                      | "dot"
                      | "ex"
                      | "hamburger"
                      | "meatballs"
                      | "plus"
                      | "tiles"
                      | "triangle"

export type IconRotation = 45 | 90 | 135 | 180 | 225 | 270 | 315
export type IconSize = 8 | 10 | 12 | 16 | 24 | 32 | 48

export interface IconProps {
  className?: string
  rotate?: IconRotation
  size: IconSize
  title?: string
  type: IconType
}

class Icon extends PureComponent<IconProps> {
  static displayName = "Icon"

  caret() {
    const d = [
      "M1.35355339,2.14644661 C1.15829124,1.95118446 0.841708755,1.95118446",
      "0.646446609,2.14644661 C0.451184464,2.34170876 0.451184464,2.65829124",
      "0.646446609,2.85355339 L3.64644661,5.85355339 C3.84170876,6.04881554",
      "4.15829124,6.04881554 4.35355339,5.85355339 L7.35355339,2.85355339",
      "C7.54881554,2.65829124 7.54881554,2.34170876 7.35355339,2.14644661",
      "C7.15829124,1.95118446 6.84170876,1.95118446 6.64644661,2.14644661",
      "L4,4.79289322 L1.35355339,2.14644661 Z",
    ].join(" ")
    return <path d={d}></path>
  }

  checkmark() {
    const d = [
      "M0.868580015,4.16221076 C0.681983812,3.95865127 0.365700126,3.94489981",
      "0.162140631,4.13149601 C-0.041418864,4.31809221 -0.0551703286,4.6343759",
      "0.131425875,4.83793539 L2.88142588,7.83793539 C3.10658294,8.08356129",
      "3.50446887,8.04438446 3.6773967,7.75956215 L7.9273967,0.759562146",
      "C8.07070856,0.523519091 7.99553507,0.215991176 7.75949201,0.0726793212",
      "C7.52344896,-0.0706325333 7.21592104,0.00454095721 7.07260919,0.240584012",
      "L3.16837842,6.67108175 L0.868580015,4.16221076 Z",
    ].join(" ")
    return <path d={d}></path>
  }

  dot() {
    return <circle cx="4" cy="4" r="3"></circle>
  }

  ex() {
    const d = [
      "M4,3.29289322 L7.14644661,0.146446609 C7.34170876,-0.0488155365",
      "7.65829124,-0.0488155365 7.85355339,0.146446609 C8.04881554,0.341708755",
      "8.04881554,0.658291245 7.85355339,0.853553391 L4.70710678,4 L7.85355339,7.14644661",
      "C8.04881554,7.34170876 8.04881554,7.65829124 7.85355339,7.85355339",
      "C7.65829124,8.04881554 7.34170876,8.04881554 7.14644661,7.85355339 L4,4.70710678",
      "L0.853553391,7.85355339 C0.658291245,8.04881554 0.341708755,8.04881554",
      "0.146446609,7.85355339 C-0.0488155365,7.65829124 -0.0488155365,7.34170876",
      "0.146446609,7.14644661 L3.29289322,4 L0.146446609,0.853553391",
      "C-0.0488155365,0.658291245 -0.0488155365,0.341708755 0.146446609,0.146446609",
      "C0.341708755,-0.0488155365 0.658291245,-0.0488155365 0.853553391,0.146446609",
      "L4,3.29289322 Z",
    ].join(" ")
    return <path d={d}></path>
  }

  hamburger() {
    const d = [
      "M0.5,1 L7.5,1 C7.77614237,1 8,1.22385763 8,1.5 C8,1.77614237 7.77614237,2 7.5,2",
      "L0.5,2 C0.223857625,2 0,1.77614237 0,1.5 C0,1.22385763 0.223857625,1 0.5,1 Z",
      "M0.5,3.5 L7.5,3.5 C7.77614237,3.5 8,3.72385763 8,4 C8,4.27614237",
      "7.77614237,4.5 7.5,4.5 L0.5,4.5 C0.223857625,4.5 0,4.27614237 0,4 C0,3.72385763",
      "0.223857625,3.5 0.5,3.5 Z M0.5,6 L7.5,6 C7.77614237,6 8,6.22385763 8,6.5",
      "C8,6.77614237 7.77614237,7 7.5,7 L0.5,7 C0.223857625,7 0,6.77614237 0,6.5",
      "C0,6.22385763 0.223857625,6 0.5,6 Z",
    ].join(" ")
    return <path d={d}></path>
  }

  meatballs() {
    const d = [
      "M0.75,4.75 C0.335786438,4.75 0,4.41421356 0,4 C0,3.58578644 0.335786438,3.25",
      "0.75,3.25 C1.16421356,3.25 1.5,3.58578644 1.5,4 C1.5,4.41421356 1.16421356,4.75",
      "0.75,4.75 Z M4,4.75 C3.58578644,4.75 3.25,4.41421356 3.25,4 C3.25,3.58578644",
      "3.58578644,3.25 4,3.25 C4.41421356,3.25 4.75,3.58578644 4.75,4 C4.75,4.41421356",
      "4.41421356,4.75 4,4.75 Z M7.25,4.75 C6.83578644,4.75 6.5,4.41421356 6.5,4",
      "C6.5,3.58578644 6.83578644,3.25 7.25,3.25 C7.66421356,3.25 8,3.58578644 8,4",
      "C8,4.41421356 7.66421356,4.75 7.25,4.75 Z",
    ].join(" ")
    return <path d={d}></path>
  }

  plus() {
    const d = [
      "M4.5,3.5 L7.5,3.5 C7.77614237,3.5 8,3.72385763 8,4 C8,4.27614237",
      "7.77614237,4.5 7.5,4.5 L4.5,4.5 L4.5,7.5 C4.5,7.77614237 4.27614237,8 4,8",
      "C3.72385763,8 3.5,7.77614237 3.5,7.5 L3.5,4.5 L0.5,4.5 C0.223857625,4.5",
      "0,4.27614237 0,4 C0,3.72385763 0.223857625,3.5 0.5,3.5 L3.5,3.5 L3.5,0.5",
      "C3.5,0.223857625 3.72385763,0 4,0 C4.27614237,0 4.5,0.223857625 4.5,0.5",
      "L4.5,3.5 Z",
    ].join(" ")
    return <path d={d}></path>
  }

  tiles() {
    const d = [
      "M0.5,0 L3.25,0 L3.25,3.25 L0,3.25 L0,0.5 C-3.38176876e-17,0.223857625",
      "0.223857625,5.07265313e-17 0.5,0 Z M4.75,0 L7.5,0 C7.77614237,-5.07265313e-17",
      "8,0.223857625 8,0.5 L8,3.25 L4.75,3.25 L4.75,0 Z M0,4.75 L3.25,4.75 L3.25,8",
      "L0.5,8 C0.223857625,8 3.38176876e-17,7.77614237 0,7.5 L0,4.75 Z M4.75,4.75",
      "L8,4.75 L8,7.5 C8,7.77614237 7.77614237,8 7.5,8 L4.75,8 L4.75,4.75 Z",
    ].join(" ")
    return <path d={d}></path>
  }

  triangle() {
    const d = [
      "M0.647448987,2.85355339 L3.64744899,5.85355339 C3.84271113,6.04881554",
      "4.15929362,6.04881554 4.35455577,5.85355339 L7.35455577,2.85355339",
      "C7.6695382,2.53857096 7.4464548,2 7.00100238,2 L1.00100238,2 C0.555549952,2",
      "0.332466556,2.53857096 0.647448987,2.85355339 Z",
    ].join(" ")
    return <path d={d}></path>
  }

  render() {
    const {
      className,
      rotate,
      size,
      title,
      type,
    } = this.props

    const containerStyle = {
      width: `${size}px`,
      height: `${size}px`,
    }

    const svgStyle = {
      transform: `rotate(${rotate || 0}deg)`,
    }

    return (
      <span className={`qmIconContainer ${className || ""}`} style={containerStyle}>
        <svg
          className={`qmIcon`}
          style={svgStyle}
          width={size}
          height={size}
          viewBox="0 0 8 8"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd">
          <title>{title || type}</title>
          {
            this[type]()
          }
        </svg>
      </span>
    )
  }
}

export default Icon
