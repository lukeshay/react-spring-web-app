const { DefinePlugin } = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    mode: "production",
    stats: {
        colors: true,
        hash: true,
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true,
        children: true
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
                LOAD_PASSWORD: JSON.stringify("choochie"),
                REST_API_URL: JSON.stringify("http://restapi.lukeshay.com/")
            }
        })
    ]
};
