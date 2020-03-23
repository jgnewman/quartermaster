const path = require("path")
const webpack = require("webpack")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const config = {
  entry: {
    app: "./app/index.tsx",
  },

  output: {
    filename: "[name].js",
    publicPath: "/",
  },

  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./app/index.ejs",
      filename: "./index.html",
      favicon: "./app/assets/favicon.png",
      vars: {}
    }),

    new MiniCssExtractPlugin({
      filename: "styles.css"
    }),

    new CopyWebpackPlugin([{
      from: "./app/assets",
      to: "assets"
    }]),

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        include: [path.resolve(__dirname, "app"), path.resolve(__dirname, "src")],
        enforce: "pre",
        use: {
          loader: "eslint-loader"
        }
      },

      {
        test: /\.(js|ts)x?$/,
        include: [path.resolve(__dirname, "app"), path.resolve(__dirname, "src")],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: { ie: "11" } }]]
            }
          },
          {
            loader: "ts-loader"
          },
        ]
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000
            }
          }
        ]
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {sourceMap: true}
          },
        ],
      },

      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {sourceMap: true}
          },
          {
            loader: "stylus-loader", // compiles stylus to CSS
          },
          {
            loader: "import-glob-loader" // allows importing directories
          },
        ]
      },

    ]
  }
}

if (process.env.NODE_ENV === "development") {
  config.devtool = "source-map"
}

if (process.env.NODE_ENV === "production") {
  config.plugins.push(new CleanWebpackPlugin())

  config.optimization = {
    splitChunks: {
      chunks: "all",
      maxSize: 100000,
    },
  }
}

module.exports = config
