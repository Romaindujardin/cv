const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|mp4)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "img", to: "img" },
        { from: "404.html", to: "404.html" },
        { from: "favicon.ico", to: "favicon.ico" },
        { from: "icon.png", to: "icon.png" },
        { from: "icon.svg", to: "icon.svg" },
        { from: "site.webmanifest", to: "site.webmanifest" },
        { from: "robots.txt", to: "robots.txt" },
      ],
    }),
  ],
};
