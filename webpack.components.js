const glob = require('glob')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const nodeExternals = require('webpack-node-externals')
const pathFormat = (dir) => dir.replace(new RegExp(`\\${path.sep}`, 'g'), '/')
const srcDir = pathFormat(path.resolve(__dirname, './src'))
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
let sourceFileDir = [
  ...glob.sync(path.resolve(__dirname, './src/**/*.*'))
].filter(i => {
  const ext = path.extname(i)
  return ['.js', '.ts', '.tsx', '.vue', '.tsx'].includes(ext) && !(/\.d\.ts$/g.test(i))
})
const { peerDependencies, devDependencies, dependencies, name } = require('./package')

const externals = [
  {},
  nodeExternals(),
  (context, request, callback) => {
    if (/core-js|corejs|tslib/g.test(request)) {
      return callback(null, 'commonjs ' + request)
    }
    if (/^@\/.*/g.test(request)) {
      // 库内部依赖间使用@/xxx引用，将打包后文件引用组件库其他部分的代码抽离出来
      return callback(null, `commonjs ${name}/dist/${request.replace('@/', '').replace(/\.(ts|js|jsx|tsx|vue)$/g, '.js')}`)
    }
    callback()
  }
  // ...componentsDir
]
Object.keys({ ...peerDependencies, ...devDependencies, ...dependencies }).forEach((d) => {
  externals[0][d] = {
    commonjs: d,
    commonjs2: d,
    root: d === 'vue' ? 'Vue' : undefined
  }
})
const entry = {}
sourceFileDir.forEach(dir => {
  const chunkName = dir.replace(srcDir, '').replace(/^\//, '').replace(/\..*$/, '')
  entry[chunkName] = dir
})

module.exports = {
  entry,
  mode: 'production',
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.tsx?$/,
        loader: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              compiler: 'ttypescript'
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: [
          {
            loader: 'vue-loader',
            options: {
              optimizeSSR: false
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }, // 将 CSS 转化成 CommonJS 模块
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          }, // 将 CSS 转化成 CommonJS 模块
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false
            }
          },
          'sass-loader' // 将 Sass 编译成 CSS，默认使用 Node Sass
        ]
      }

    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin()
  ],
  resolve: {
    modules: ['node_modules'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm',
      '.ts',
      '.tsx'
    ]
  },
  externals,
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      cacheGroups: {
        style: {
          name: 'index',
          test: /\.css$|\.scss$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  watch: process.env.ENV === 'watch'
}
