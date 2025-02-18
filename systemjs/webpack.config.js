const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = (env) => {
  return {
    mode: 'development',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: env.production ? 'system' : ''  //打包的格式 system模块
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: { loader: 'babel-loader' },
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      // 生产环境下不需要HtmlWebpackPlugin
      !env.production && new HtmlWebpackPlugin({
        template: './public/index.html'
      })
    ].filter(Boolean),
    externals: env.production ? ['react', 'react-dom'] : []
  }
}