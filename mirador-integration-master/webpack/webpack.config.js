const path = require('path');

module.exports = deployment => {
  let basename = path.join('dist', deployment ? path.basename(deployment) : '');
  return {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, basename),
      publicPath: deployment || './dist/',
    },
  };
};