const path = require('path');

module.exports = (env, args) => {
  return {
    entry: './src/index.js',
    mode: env.deployment ? 'production' : 'development',
    output: {
      filename: 'main.js',
      path: path.join(process.cwd(), 'dist/[hash]'),
      publicPath: env.deployment + '/[hash]'
    },
  };
};
