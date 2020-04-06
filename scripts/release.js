/**
 * How this script works:
 * 1. Fetches branches from github to determine the latest version name
 * 2. Generates a new version name by incrementing the latest version name according to the provided arg
 * 3. Creates a new git branch named after the new version.
 * 4. Runs a build.
 * 5. Manually fixes source map source urls becase we are about to move output files.
 * 6. Copies files from dist to root.
 * 7. Pushes to the new branch.
 */

const fs = require("fs")
const path = require("path")
const fetch = require("node-fetch")
const execPromise = require("exec-sh").promise
const prompts = require("prompts")
const package = require("../package.json")
const { promisify } = require("util")

const asyncReadDir = promisify(fs.readdir)
const asyncReadFile = promisify(fs.readFile)
const asyncWriteFile = promisify(fs.writeFile)

const colorReset = "\x1b[0m"
const colorBright = "\x1b[1m"
const colorGreen = "\x1b[32m"
const colorYellow = "\x1b[33m"
const colorRed = "\x1b[31m"

// ex: jgnewman/quartermaster
const apiPath = package.repository.url.replace(/^[^\.]+\.com\/|\.git$/g, "")
const releaseType = process.argv[2] || "inc"
const allowedReleaseTypes = ["inc", "minor", "major"]

if (!process.env.GITHUB_TOKEN) {
  throw new Error("Missing environment variable GITHUB_TOKEN")
}

if (!allowedReleaseTypes.includes(releaseType)) {
  throw new Error(`Unknown release type "${releaseType}" specified`)
}

function log(...args) {
  console.log(`${colorGreen}[release]${colorReset}`, ...args)
}

function logWarn(...args) {
  console.log(`${colorYellow}[release]${colorReset}`, ...args)
}

function logErr(...args) {
  console.log(`${colorRed}[release]${colorReset}`, ...args)
}

async function getBranches() {
  const branchesURL = `https://api.github.com/repos/${apiPath}/branches`
  const branches = await fetch(branchesURL, { headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` } })
  return branches.json()
}

async function createRelease(version, description) {
  const releaseURL = `https://api.github.com/repos/${apiPath}/releases`
  const result = await fetch(releaseURL, {
    method: "POST",
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tag_name: version,
      target_commitish: version,
      name: version,
      body: description,
      draft: false,
      prerelease: false,
    }),
  })
  return result.json()
}

async function getLatestVersion() {
  const branches = await getBranches()
  const versionBranches = branches.filter(branch => /^v\d/.test(branch.name))
  const latestBranch = versionBranches.sort((a, b) => {
    if (a.name < b.name) {
      return 1
    } else if (a.name > b.name) {
      return -1
    } else {
      return 0
    }
  })[0]
  return latestBranch.name || "v0.0.0"
}

async function createNewVersionNumber() {
  const lastestVersionNumber = await getLatestVersion()
  const [curMaj, curMin, curInc] = lastestVersionNumber.slice(1).split(".").map(piece => parseInt(piece, 10))
  let newVersion

  switch (releaseType) {
    case "major":
      newVersion = `v${[curMaj + 1, 0, 0].join(".")}`
      break

    case "minor":
      newVersion = `v${[curMaj, curMin + 1, 0].join(".")}`
      break

    case "inc":
    default:
      newVersion = `v${[curMaj, curMin, curInc + 1].join(".")}`
      break
  }

  return newVersion
}

async function patchSources() {
  const distPath = path.resolve(__dirname, "../dist")
  const possibleDirs = await asyncReadDir(distPath, { withFileTypes: true })
  const distDirs = possibleDirs.filter(dirent => dirent.isDirectory())

  const entryMap = path.resolve(distPath, "index.js.map")
  const entryContent = await asyncReadFile(entryMap)
  await asyncWriteFile(entryMap, entryContent.toString().replace(/\.\.\/src/, "./src"))

  return Promise.all(distDirs.map(async ({ name }) => {
    const dirPath = path.resolve(distPath, name)
    const files = await asyncReadDir(dirPath)

    return Promise.all(files.map(async (fileName) => {
      if (/\.map$/.test(fileName)) {
        const filePath = path.resolve(dirPath, fileName)
        const contents = await asyncReadFile(filePath)
        return asyncWriteFile(filePath, contents.toString().replace(/\.\.\/\.\.\/src/, "../src"))
      }
    }))
  }))
}

async function release() {
  try {
    log("Generating new version number...")
    const newVersion = await createNewVersionNumber()

    log(`Preparing release branch \x1b[32m${newVersion}\x1b[0m...`)
    log("Current git status is:\n")
    await execPromise(`git status`)
    console.log("\n")

    logWarn("Sanity check! Make sure you don't have uncommit changes before proceeding.")
    logWarn("Sanity check! Make sure you are creating your release from master.\n")
    const { confirmed } = await prompts({
      type: "confirm",
      name: "confirmed",
      message: `\x1b[1mDo you want to proceed with release branch \x1b[32m${newVersion}\x1b[0m\x1b[1m?`,
    })

    if (!confirmed) {
      log("Release process aborted.\n")
      return
    }

    const { description } = await prompts({
      type: "text",
      name: "description",
      message: "Please describe your release:",
    })
    log("If you don't like your release message you can always change it in github!")

    log(`Checking out branch ${newVersion}...`)
    await execPromise(`git checkout -b ${newVersion}`)

    log(`Building library...`)
    await execPromise(`npm run build`)

    log(`Patching source map locations...`)
    await patchSources()

    log(`Copying files and removing raw build...`)
    await execPromise(`cp -R ./dist/* ./ && rm -rf ./dist`)

    log("Committing and pushing new release...")
    await execPromise(`git add . && git commit -m "Create release ${newVersion}" && git push origin ${newVersion}`)

    log("Registering branch as release with github...")
    await createRelease(newVersion, description)

    log("Returning to master branch...")
    await execPromise("git checkout master")

    log("Release created successfully.")

  } catch (err) {
    logErr(err)
  }
}

release()
