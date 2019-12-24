/**
 * babel-plugin-import 插件配置
 */
const dasherize = require('dasherize')
const path = require('path')
const fs = require('fs')
const pkgJSON = require('./package.json')
/**
 * options
 * {
 *  style:boolean  是否自动导入样式代码
 * }
 */
const modulePath = path.join(process.cwd(), `./node_modules/${pkgJSON.name}`)
module.exports = ({ style = true } = {}) => {
  console.log(this)
  return {
    libraryName: pkgJSON.name,
    libraryDirectory: 'dist/components',
    camel2DashComponentName: false,
    customName: (name, file) => {
      let fileName = path.join(modulePath, `./dist/components/${dasherize(name)}.js`)
      if (fs.existsSync(fileName)) {
        return fileName.replace(modulePath, pkgJSON.name)
      }
      fileName = path.join(modulePath, `./dist/directivies/${dasherize(name)}.js`)
      if (fs.existsSync(fileName)) {
        return fileName.replace(modulePath, pkgJSON.name)
      }
      throw new Error(`找不到${name}`)
    },
    style: style === false ? false : (name, file) => {
      const scssFilePath = path.resolve(__dirname, `src/styles/components/${path.basename(name).replace('.js', '')}.scss`)
      if (fs.existsSync(scssFilePath)) {
        return scssFilePath
      }
    }
  }
}
