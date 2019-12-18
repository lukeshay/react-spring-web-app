const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ProvidePlugin } = require("webpack");

module.exports = {
  entry: {
    index: "./src/index.jsx"
  },
  output: {
    path: path.resolve(__dirname, "../", "dist"),
    publicPath: "/",
    filename: "index.bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          configFile: "../.tsconfig.json"
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new ProvidePlugin({
      React: "react"
    })
  ],
  devtool: "source-map"
};
