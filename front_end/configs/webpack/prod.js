const merge = require("webpack-merge");
const { resolve } = require("path");
const BrotliPlugin = require("brotli-webpack-plugin");
const { DefinePlugin } = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  entry: "./index.tsx",
  output: {
    filename: "js/bundle.[hash].min.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false
          }
        }
      })
    ],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor_app",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        BASE_URL: JSON.stringify("https://restapi.lukeshay.com/")
      }
    }),
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.(ts|tsx|js|jsx|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});
