import type { ServerProtocol, BackendConfig } from "@app/types/config";

import * as url from 'url';
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import webpack from "webpack";
import config from '../../config/index';

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const isDevelopment = process.env.NODE_ENV !== "production";

export default {
  mode: isDevelopment ? "development" : "production",
  entry: "./src/index.tsx",
  devServer: {
    // hot: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: (config as never as {frontend: {port: number}}).frontend.port,
    allowedHosts: "all"
  },
  target: "web",
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
    //   __API_HOST__: config.backend[config.backend.protocol].host,
      __API_PORT__: (config as unknown as {backend: BackendConfig}).backend[((config as unknown as {backend: BackendConfig}).backend.protocol as ServerProtocol )|| "http"]?.port
    })
  ],
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    // extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    extensions: [".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$|tsx/,
        exclude: /node_modules/,
        // loader: require.resolve("babel-loader"),
        // loader: (async () => {
        //   const dependencyAsset = await import.meta.resolve('babel-loader');
        // })(),
        // use: "babel-loader",
        // options: {
        //   plugins: [
        //     // isDevelopment && require.resolve("react-refresh/babel"),
        //     // isDevelopment && (async () => {
        //     //   const dependencyAsset = await import.meta.resolve('react-refresh/babel');
        //     // })()
        //     isDevelopment
        //   ].filter(Boolean),
        // },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg/,
        type: 'asset/source' // inline
      }
    ],
  },
};
