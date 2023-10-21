/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
entry: "./admin/app.js",
output: {
filename: "bundle.[hash].js",
path: path.resolve(__dirname, "build")
},
devServer: {
  port: 9000
},
mode: 'development',
plugins: [
  new HtmlWebpackPlugin({
    template: "./admin/index.html",
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