const path = require("path");
const webpack = require("webpack");


const port = process.env.PORT || 3000;

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  resolve: {
    alias: {
      "ag-grid-community": path.resolve('./node_modules/ag-grid-community')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        // For pure CSS (without CSS modules)
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: ['style-loader', 'css-loader','postcss-loader'],
      },
      {
        // For CSS modules
        test: /\.module\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify('production')
  })
  ],


  // resolve: {
  //   alias: {
  //     config$: './configs/app-config.js',
  //     react: './vendor/react-master',
  //   },
  //   extensions: ['', 'js', 'jsx'],
  //   modules: [
  //     'node_modules',
  //     'bower_components',
  //     'shared',
  //     '/shared/vendor/modules',
  //   ],
  // },


};
