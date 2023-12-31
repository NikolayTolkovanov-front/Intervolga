const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || "development";
console.log("mode:", mode);
const devMode = (mode === "development");

const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

const siteTitle = devMode ? "dev" : "prod"

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 8080,
    open: true,
    hot: true,
  },
  entry: ["@babel/polyfill", path.resolve(__dirname, "src", "index.js")],
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "index.[contenthash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      filename: "index.html",
      minify: true,
      title: siteTitle,
    }),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')]
              }
            },
          },
          "sass-loader"
        ],
      },
      {
        test: /.(woff|woff2|ttf)/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]"
        },
      },
      {
        test: /.m?js/i,
        exclude: /(node_modules)|bower_components/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        },
      },
    ],
  },
};
