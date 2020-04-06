const { promisify } = require("util")
const fs = require("fs")
const path = require("path")

const mkdirPromise = promisify(fs.mkdir)
const writeFilePromise = promisify(fs.writeFile)

const componentName = process.argv[2]
if (!componentName) {
  throw new Error("Component creator requires a component name argument.")
}

function generateTemplate(componentName) {
  const classString = '${className || ""}'
  return `
    import React, { PureComponent } from "react"

    export interface ${componentName}Props {
      className?: string
    }

    class ${componentName} extends PureComponent<${componentName}Props> {
      static displayName = "${componentName}"

      render() {
        const {
          className,
        } = this.props

        return (
          <div className={\`qm${componentName} ${classString}\`}></div>
        )
      }
    }

    export default ${componentName}
  `.replace(/(\n)    /g, "$1").trim() + "\n"
}

async function init() {
  const dirPath = path.resolve(__dirname, `../src/${componentName}`)
  const filePath = path.resolve(dirPath, "index.tsx")
  const template = generateTemplate(componentName)

  console.log(`Creating directory ${dirPath}...`)
  await mkdirPromise(dirPath)

  console.log(`Writing file ${filePath}...`)
  await writeFilePromise(filePath, template)

  console.log("Success.")
}

init()
