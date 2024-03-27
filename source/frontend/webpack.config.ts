import type { ServerProtocol, BackendConfig } from '@app/types/config';
import type { Configuration } from 'webpack';

import * as url from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import config from '../../config/index';

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const isDevelopment = process.env.NODE_ENV !== 'production';
const plugins = [
  new HtmlWebpackPlugin({
    template: './public/index.html'
  }),
  new webpack.DefinePlugin({
    //   __API_HOST__: config.backend[config.backend.protocol].host,
    __API_PORT__: (config as unknown as { backend: BackendConfig }).backend[((config as unknown as { backend: BackendConfig }).backend.protocol as ServerProtocol) || 'http']?.port
  })
];
if (isDevelopment) {
  plugins.push(new webpack.HotModuleReplacementPlugin() as HtmlWebpackPlugin, new ReactRefreshWebpackPlugin() as unknown as HtmlWebpackPlugin);
}

const configuration: Configuration = {
  devtool: 'source-map',
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.tsx',
  // devServer: {
  //   proxy: {
  //     '/api': `http://localhost:3000`
  //   },
  //   // hot: true,
  //   static: {
  //     directory: path.join(__dirname, 'public')
  //   },
  //   compress: true,
  //   port: (config as never as { frontend: { port: number } }).frontend.port,
  //   allowedHosts: 'all'
  // },
  target: 'web',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins,
  resolve: {
    modules: [__dirname, 'src', 'node_modules'],
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@service': path.resolve(__dirname, 'src/service'),

      // кандидаты на улучшение
      '@form': path.resolve(__dirname, 'src/form'),
      '@popup': path.resolve(__dirname, 'src/popup'),
      '@component': path.resolve(__dirname, 'src/component')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$|tsx/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }], '@babel/preset-typescript']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.svg/,
        type: 'asset/source' // inline
      }
    ]
  }
};

export default configuration;
