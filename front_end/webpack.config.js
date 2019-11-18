const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: "./public/index.html",
    filename: "./index.html"
});

const babelLoaderRule = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
        }
    }
};

const cssLoaderRule = {
    test: /\.css$/i,
    use: ["style-loader", "css-loader"]
};

module.exports = {
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [babelLoaderRule, cssLoaderRule]
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        historyApiFallback: true
    },
    plugins: [htmlWebpackPlugin]
};
