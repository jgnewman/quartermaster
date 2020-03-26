/**
 * How this script works:
 * 1. Fetches branches from github to determine the latest version name
 * 2. Generates a new version name by incrementing the latest version name according to the provided arg
 * 3. Creates a new git branch named after the new version.
 * 4. Runs a build, copies files to /lib, and pushes to the new branch.
 */

const fetch = require("node-fetch")
const execPromise = require("exec-sh").promise
const prompts = require("prompts")
const package = require("../package.json")

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

async function release() {
  try {
    log("Generating new version number...")
    const newVersion = await createNewVersionNumber()

    log(`Preparing release branch \x1b[32m${newVersion}\x1b[0m...`)
    log("Current git status is:\n")
    await execPromise(`git status`)
    console.log("\n")

    logWarn("Do not attempt to create a new release if you have uncommited changes.")
    const { confirmed } = await prompts({
      type: "confirm",
      name: "confirmed",
      message: `\x1b[1mDo you want to proceed with release branch \x1b[32m${newVersion}\x1b[0m\x1b[1m?`,
    })

    if (!confirmed) {
      log("Release process aborted.\n")
      return
    }

    await execPromise(`git checkout -b ${newVersion}`)

  } catch (err) {
    logErr(err)
  }
}

release()

/*
Plan is to...

create a new branch named with the new version and switch over to it,
run a build then copy everything from dist over to lib,
commit and push to the new branch,
switch back to master branch.
*/
