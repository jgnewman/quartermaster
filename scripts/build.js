const fs = require("fs")
const { promisify } = require("util")
const path = require("path")
const execPromise = require("exec-sh").promise

const srcPath = path.resolve(__dirname, "../src")
const distPath = path.resolve(__dirname, "../dist")

const asyncReadDir = promisify(fs.readdir)
const asyncReadFile = promisify(fs.readFile)
const asyncWriteFile = promisify(fs.writeFile)

async function assertDir(path) {
  if (!fs.existsSync(path)) {
    return execPromise(`mkdir ${path}`)
  }
}

// Within a directory, retrieves dirent objects for every
// subdirectory where the directory's name begins with a capital letter.
async function getComponentDirs(withinDir, ...additionalDirs) {
  const possibleDirs = await asyncReadDir(withinDir, { withFileTypes: true })
  return possibleDirs.filter(dirent => {
    return (additionalDirs.includes(dirent.name) || /[A-Z]/.test(dirent.name[0])) && dirent.isDirectory()
  })
}

// Removes the /dist and /tmp folders
async function clean() {
  console.log(`Cleaning ${distPath}`)
  return execPromise(`rm -rf ${distPath}`)
}

// Compiles typescript from the /tmp folder to the /dist folder.
// Uses the tsconfig located in the /scripts folder.
async function compileTypeScript() {
  console.log("Compiling TypeScript")
  return execPromise(`NODE_ENV=production tsc --rootDir ${srcPath} --outDir ${distPath} --declaration`)
}

/**
 * HACK:
 *
 * Because we don't want to bundle the library and typescript doesn't
 * native understand stylus, using tsc to compile results in references
 * to .styl files in our javascript output.
 *
 * So after compiling typescript, we go through the compiled js and d.ts
 * files and do a manual string replace from "styles.styl" to "styles.css".
 * Theoretically source maps should be fine because these strings do not
 * change location within the file and the locations of other tokens are not
 * affected.
 */
async function transformCSSExtensions() {
  console.log("Transforming CSS import file extensions")

  const distDirs = await getComponentDirs(distPath)
  return Promise.all(distDirs.map(async ({ name }) => {
    const dirPath = path.resolve(distPath, name)
    const files = await asyncReadDir(dirPath)

    return Promise.all(files.map(async (fileName) => {
      if (/(\.js|\.d\.ts)$/.test(fileName)) {
        const filePath = path.resolve(dirPath, fileName)
        const contents = await asyncReadFile(filePath)
        return asyncWriteFile(filePath, contents.toString().replace(/\.\/styles\.styl/, "./styles.css"))
      }
    }))
  }))
}

// Assuming we've already created our /dist directories with tsc,
// this goes through the stylus files for each component in /src
// and compiles a css file to the corresponding directories in /dist.
async function compileStylus() {
  console.log("Compiling Stylus")
  const srcDirs = await getComponentDirs(srcPath)

  return Promise.all(srcDirs.map(async ({ name }) => {
    const dirPath = path.resolve(srcPath, name)
    const files = await asyncReadDir(dirPath)

    return Promise.all(files.map(async (fileName) => {
      if (/\.styl$/.test(fileName)) {
        const baseName = fileName.replace(/\.styl$/, "")
        const srcFilePath = path.resolve(dirPath, fileName)
        const destDirPath = path.resolve(distPath, name)
        const destFilePath = path.resolve(destDirPath, baseName + ".css")
        await assertDir(destDirPath)
        return execPromise(`stylus --sourcemap --include ${dirPath} < ${srcFilePath} > ${destFilePath}`)
      }
    }))

  }))
}

async function init() {
  await clean()
  await compileTypeScript()
  await transformCSSExtensions()
  await compileStylus()
}

init()
