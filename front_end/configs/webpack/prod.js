// production config
const merge = require('webpack-merge');
const { resolve } = require('path');

const { DefinePlugin } = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const commonConfig = require('./common');

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
    devtool: "source-map",
    plugins: [
        new DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
                LOAD_PASSWORD: JSON.stringify("choochie"),
                BASE_URL: JSON.stringify("https://restapi.lukeshay.com/")
            }
        })
    ]
});
