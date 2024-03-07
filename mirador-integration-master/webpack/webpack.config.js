const path = require('path');

module.exports = env => {
  let basename = path.join('dist', env.deployment ? path.basename(env.deployment) : '');
  return {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, basename),
      publicPath: env.deployment || './dist/',
    },
  };
};
