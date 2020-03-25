const fetch = require("node-fetch")
const package = require("../package.json")

// ex: jgnewman/quartermaster
const apiPath = package.repository.url.replace(/^[^\.]+\.com\/|\.git$/g, "")
const releaseType = process.argv[2] || "inc"

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
  return latestBranch.name
}

getLatestVersion()

console.log(releaseType)

/*
Plan is to...
figure out the latest branch,
increment as appropriate for new release version name,
create a new branch named with the new version and switch over to it,
run a build then copy everything from dist over to lib,
commit and push to the new branch,
switch back to master branch.
*/