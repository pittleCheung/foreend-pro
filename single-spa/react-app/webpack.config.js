const { merge } = require("webpack-merge")
const singleSpaDefaults = require("webpack-config-single-spa-react")

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "pittle",
    projectName: "react",
    webpackConfigEnv,
    argv,
  })

  // console.log(defaultConfig)  // defaultConfig中默认的 externals: [ 'single-spa', /^@pittle\//, 'react', 'react-dom' ],

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      open: false,
      hot: true, // 开启HMR
      port: 4000,
      proxy: {},
    },
    externals: ["react-router-dom", "react-dom/client", "@remix-run/router"], //
  })
}
