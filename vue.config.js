const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const path = require('path')

const plugins = []
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

if (process.env.NODE_ENV === 'production') {
  plugins.concat([
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: productionGzipExtensions,
      threshold: 2048,
      minRatio: 0.8,
    }),
  ]);
}

if (process.argv.includes('--report')) {
  plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    analyzerHost: '127.0.0.1',
    analyzerPort: 8888,
  }));
}

module.exports = {
  configureWebpack: {
    plugins,
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            { loader: 'html-loader' },
            { loader: 'markdown-loader', options: {} }
          ]
        }
      ]
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true, // console
              drop_debugger: false
            }
          }
        })
      ]
    }
  },
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/style/var.scss'),
        path.resolve(__dirname, './src/style/func.scss'),
        path.resolve(__dirname, './src/style/mixin.scss')
      ],
    },
  }
}