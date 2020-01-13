const merge = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./common");
const { DefinePlugin } = require("webpack");

module.exports = merge(commonConfig, {
  mode: "development",
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://0.0.0.0:3000",
    "webpack/hot/only-dev-server",
    "./index.tsx"
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: "./",
    host: "0.0.0.0",
    hot: true,
    port: 3000
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        BASE_URL: JSON.stringify("http://localhost:5000/")
      }
    })
  ]
});
