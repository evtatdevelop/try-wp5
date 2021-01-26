const path = require("path");
const precss = require("precss");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: { app: "./src/index.js" },

  output: {
    publicPath: '.',
    // publicPath: '',
    filename: "js/[name].[fullhash:5].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      plugins: () => [precss, autoprefixer],
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: "asset/resource",
      // },
      {
        test: /\.svg$/i,
        // type: "asset/resource",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "./img/[name].[ext]",
          // name: "[name].[ext]",
          // outputPath: "./img",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        // type: "asset/resource",
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './fonts/[name].[ext]',
              // name: '[name].[ext]',
              // outputPath: "./fonts",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({filename: "css/styles.css"}),
    new HtmlWebpackPlugin({
      title: "My App",
      template: "src/index.html",
    }),
  ],
  mode: "development",
};
