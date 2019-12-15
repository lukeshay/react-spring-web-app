const { DefinePlugin } = require("webpack");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  plugins: [
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        LOAD_PASSWORD: JSON.stringify("choochie"),
        BASE_URL: JSON.stringify("http://localhost:5000/")
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: "./dist"
  }
};
