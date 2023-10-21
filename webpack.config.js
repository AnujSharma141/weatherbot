const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
entry: "./app.js",
output: {
filename: "bundle.[hash].js",
path: path.resolve(__dirname, "dist")
},
devServer: {
  port: 9000
},
mode: 'development',
plugins: [
  new HtmlWebpackPlugin({
    template: "./public/index.html",
  }),
],
  module: {
    rules: [{
   test: /\.js$/,
   exclude: /node_modules/,
   use: {
     loader: "babel-loader"
   }
 },
  {
   test: /\.css$/,
   use: ["style-loader", "css-loader"]
  }
]},
};