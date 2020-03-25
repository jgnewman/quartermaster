const fetch = require("node-fetch")
const package = require("../package.json")

// ex: jgnewman/quartermaster
const apiPath = package.repository.url.replace(/^[^\.]+\.com\/|\.git$/g, "")

async function getBranches() {
  const branchesURL = `https://api.github.com/repos/${apiPath}/branches`
  const branches = await fetch(branchesURL, { headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` } })
  return branches.json()
}

async function getLatestVersion() {
  const branches = await getBranches()
  console.log(branches)
}

getLatestVersion()

/*
Plan is to...
figure out the latest branch,
increment as appropriate for new release version name,
create a new branch named with the new version and switch over to it,
run a build then copy everything from dist over to lib,
commit and push to the new branch,
switch back to master branch.
*/