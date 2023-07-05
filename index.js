const { Compilation, sources } = require('webpack')
const {
  getGitInfo,
  getBuildMode,
  parseJsBuildInfo,
  parseHtmlBuildInfo
} = require('./helpers')

class InjectGitnameWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(
      'InjectGitnameWebpackPlugin',
      (compilation) => {
        compilation.hooks.processAssets.tapPromise(
          {
            name: 'InjectGitnameWebpackPlugin',
            stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER
          },
          async (assets) => {
            const buildMode = getBuildMode()
            if (buildMode === 'production') return
            const gitInfo = getGitInfo()
            const { name, email, branch, latestGitLog } = gitInfo
            const buildTime = new Date().toString()
            const reg = /.js$/
            const htmlReg = /.html$/
            Object.keys(assets).forEach(async (asset) => {
              if (reg.test(asset)) {
                const source = assets[asset].source()
                const prefixInfo = parseJsBuildInfo({
                  name,
                  email,
                  branch,
                  buildTime,
                  latestGitLog
                })
                const newSourceStr = prefixInfo + source
                await compilation.updateAsset(
                  asset,
                  new sources.RawSource(newSourceStr)
                )
              }
              if (htmlReg.test(asset)) {
                const source = assets[asset].source()
                const prefixInfo = parseHtmlBuildInfo({
                  name,
                  email,
                  branch,
                  buildTime,
                  latestGitLog
                })
                const newSourceStr = prefixInfo + source
                await compilation.updateAsset(
                  asset,
                  new sources.RawSource(newSourceStr)
                )
              }
            })
          }
        )
      }
    )
  }
}

module.exports = InjectGitnameWebpackPlugin
