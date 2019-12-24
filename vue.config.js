const IS_DEV = process.env.ENV === 'development'
module.exports = {
  pages: !IS_DEV ? undefined : {
    index: './example/index.ts'
  },
  configureWebpack: {
    devtool: 'sourcemap'
  }
}
