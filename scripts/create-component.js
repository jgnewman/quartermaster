const { promisify } = require("util")
const fs = require("fs")
const path = require("path")

const mkdirPromise = promisify(fs.mkdir)
const writeFilePromise = promisify(fs.writeFile)

const componentName = process.argv[2]
if (!componentName) {
  throw new Error("Component creator requires a component name argument.")
}

function createStylTemplate(componentName) {
  return `
    @import "../lib/sharedStyles"

    .qm${componentName}Container
      display: block
  `.replace(/(\n)    /g, "$1").trim() + "\n"
}

function createJSXTemplate(componentName) {
  const classString = '${className || ""}'
  return `
    import "./styles.styl"
    import React, { memo } from "react"

    export interface ${componentName}Props {
      className?: string
    }

    function ${componentName}({
      className,
    }: ${componentName}Props) {

      return (
        <div className={\`qm${componentName}Container ${classString}\`}></div>
      )
    }

    ${componentName}.displayName = "${componentName}"

    export default memo(${componentName})
  `.replace(/(\n)    /g, "$1").trim() + "\n"
}

async function init() {
  const dirPath = path.resolve(__dirname, `../src/${componentName}`)
  const jsxPath = path.resolve(dirPath, "index.tsx")
  const stylPath = path.resolve(dirPath, "styles.styl")

  const jsxTemplate = createJSXTemplate(componentName)
  const stylTemplate = createStylTemplate(componentName)

  console.log(`Creating directory ${dirPath}...`)
  await mkdirPromise(dirPath)

  console.log(`Writing file ${jsxPath}...`)
  console.log(`Writing file ${stylPath}...`)
  await Promise.all([
    writeFilePromise(jsxPath, jsxTemplate),
    writeFilePromise(stylPath, stylTemplate),
  ])

  console.log("Success.")
}

init()
