import path from 'path';
import webpack from 'webpack'; //eslint-disable-line
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default () => ({
  mode: 'production',
  entry: {
    index: path.join(__dirname, './index.js')
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,

        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },

  plugins: [
    // Clean dist folder
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist/build.js']
    })
  ]
});
