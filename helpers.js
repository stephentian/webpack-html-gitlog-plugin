const exec = require('child_process').execSync

module.exports.getGitInfo = function () {
  let name = ''
  let email = ''
  let branch = ''
  let latestGitLog = ''
  try {
    name = exec('git config --get user.name')
    email = exec('git config --get user.email')
    branch = exec('git branch --show-current')
    latestGitLog = exec('git log -1 --pretty=oneline')
  } catch (e) {
    throw new Error(e)
  }

  return {
    name,
    email,
    branch,
    latestGitLog
  }
}

module.exports.getBuildMode = () => {
  return (process.env.BABEL_ENV || '').toLowerCase()
}

module.exports.parseJsBuildInfo = (buildInfo) => {
  const infoStr = Object.keys(buildInfo)
    .map((key) => ` * ${key}: ${buildInfo[key]}`.replace('\n', ''))
    .join('\n')
  return `/**\n${infoStr}\n*/\n`
}

module.exports.parseHtmlBuildInfo = (buildInfo) => {
  const infoStr = Object.keys(buildInfo)
    .map((key) => ` * ${key}: ${buildInfo[key]}`.replace('\n', ''))
    .join('\n')
  return `<!--\n${infoStr}\n-->\n`
}
