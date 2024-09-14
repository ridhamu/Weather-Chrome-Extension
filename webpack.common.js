const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    popup: path.resolve('src/popup/popup.tsx'),
    option: path.resolve('src/option/option.tsx'),
    background: path.resolve('src/background/background.ts'),
    contentScript: path.resolve('src/contentScript/contentScript.ts'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        /*
        “Hai kompiler webpack, ketika Anda menemukan jalur yang berujung pada file '.css' di dalam pernyataan require() / import, gunakan 'css-loader' atau 'style-loader' untuk mengubahnya sebelum Anda menambahkannya ke dalam bundel.”
         */
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('./src/static/manifest.json'),
          to: path.resolve('./dist'),
        },
        {
          from: path.resolve('./src/static/icons'),
          to: path.resolve('./dist/icons'),
        },
      ],
    }),
    ...getHtmlPlugin(['popup', 'option']),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};

function getHtmlPlugin(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlWebpackPlugin({
        title: 'React Extension',
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}
