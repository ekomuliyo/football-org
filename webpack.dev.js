const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: "/node_modules/",
              use: ["babel-loader", "eslint-loader"]
            },
          ],
    }
})