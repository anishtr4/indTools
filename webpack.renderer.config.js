const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' },  { loader: 'sass-loader' }],
});
rules.push({
  test:/\.(png|jpg|woff|svg|eot|ttf|woff2)$/,
  use:'url-loader?limit=8192&name=images/[name].[ext]'
}
);

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  target: "electron-renderer",
     devServer: {
    historyApiFallback: true,
  }
};
