const fs = require("fs")
const { promisify } = require("util")
const path = require("path")
const execPromise = require("exec-sh").promise

const srcPath = path.resolve(__dirname, "../src")
const tempPath = path.resolve(__dirname, "../tmp")
const distPath = path.resolve(__dirname, "../dist")
const buildConfigPath = path.resolve(__dirname, "./tsconfig.json")

const asyncReadDir = promisify(fs.readdir)
const asyncReadFile = promisify(fs.readFile)
const asyncWriteFile = promisify(fs.writeFile)

// Within a directory, retrieves dirent objects for every
// subdirectory where the directory's name begins with a capital letter.
async function getComponentDirs(withinDir) {
  const possibleDirs = await asyncReadDir(withinDir, { withFileTypes: true })
  return possibleDirs.filter(dirent => /[A-Z]/.test(dirent.name[0]) && dirent.isDirectory())
}

// Removes the /dist and /tmp folders
async function clean() {
  console.log(`Cleaning ${distPath}`)
  return execPromise(`rm -rf ${distPath} && rm -rf ${tempPath}`)
}

// Compiles typescript from the /tmp folder to the /dist folder.
// Uses the tsconfig located in the /scripts folder.
async function compileTypeScript() {
  console.log("Compiling TypeScript")
  return execPromise(`NODE_ENV=production tsc --rootDir ${tempPath} --outDir ${distPath} -p ${buildConfigPath} --declaration`)
}

// HACK
// In /src, our typescript files are importing stylus modules.
// Typescript doesn't know anything about stylus and we don't want to use
// webpack here so the result is that if we use tsc to compile the
// typescript, we will end up with references to .styl files in the
// compiled output. This circumvents that problem by copying /src into
// a /tmp folder and then manually reading each component and doing a
// string replace that changes "./styles.styl" to "./styles.css".
// This way we can run tsc on the the /tmp folder and end up with
// references to css files without hurting our /src folder.
async function transformCSSExtensions() {
  console.log("Transforming CSS import file extensions")
  await execPromise(`cp -a ${srcPath}/. ${tempPath}/`)

  const srcDirs = await getComponentDirs(tempPath)
  await Promise.all(srcDirs.map(async ({ name }) => {
    const dirPath = path.resolve(tempPath, name)
    const files = await asyncReadDir(dirPath)

    files.forEach(async (fileName) => {
      if (/\.tsx$/.test(fileName)) {
        const filePath = path.resolve(dirPath, fileName)
        const contents = await asyncReadFile(filePath)
        await asyncWriteFile(filePath, contents.toString().replace(/\.\/styles\.styl/, "./styles.css"))
      }
    })
  }))
}

// Assuming we've already created our /dist directories with tsc,
// this goes through the stylus files for each component in /src
// and compiles a css file to the corresponding directories in /dist.
async function compileStylus() {
  console.log("Compiling Stylus")
  const srcDirs = await getComponentDirs(srcPath)

  await Promise.all(srcDirs.map(async ({ name }) => {
    const dirPath = path.resolve(srcPath, name)
    const files = await asyncReadDir(dirPath)

    if (files.includes("styles.styl")) {
      const srcFilePath = path.resolve(dirPath, "styles.styl")
      const destFilePath = path.resolve(distPath, name, "styles.css")
      await execPromise(`stylus --include ${dirPath} < ${srcFilePath} > ${destFilePath}`)
    }
  }))
}

async function init() {
  await clean()
  await transformCSSExtensions()
  await compileTypeScript()
  await compileStylus()
  await execPromise(`rm -rf ${tempPath}`)
}

init()
