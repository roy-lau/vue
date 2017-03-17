/*最后是build文件夹下面两个比较简单的文件，dev-client.js似乎没有使用到，代码也比较简单，这里不多讲。
  
  check-version.js完成对node和npm的版本检测，
  下面是其代码注释：*/

//用于在控制台输出带颜色字体的插件
var chalk = require('chalk')
// 语义化版本检查插件(使用NPM语义版本分析器)
var semver = require('semver')
// 引入package.json
var packageConfig = require('../package.json')

// 开辟子进程执行命令cmd并返回结果
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

// node和npm版本需求
var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
  {
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  }
]

module.exports = function () {
  var warnings = []
  // 判断版本是否符合要求
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }
  // 如果有警告则将其控制台输出
  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
