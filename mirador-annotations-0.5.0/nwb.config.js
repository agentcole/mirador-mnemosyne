const path = require('path');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'MiradorAnnotation',
      externals: {
        react: 'React',
      },
    },
  },
  webpack: {
    html:{
      mountId: "mirador",
      templateParameters: {
        apiURL: "http://localhost:8000",
        mainifestURL: "http://example.com/iiif/object/"
      },
      title: "Mnemosyne Demo",
      template: path.resolve('./demo/src/template.ejs'),
      minify: false
    },
    aliases: {
      '@material-ui/core': path.resolve('./', 'node_modules', '@material-ui/core'),
      '@material-ui/styles': path.resolve('./', 'node_modules', '@material-ui/styles'),
      react: path.resolve('./', 'node_modules', 'react'),
      'react-dom': path.resolve('./', 'node_modules', 'react-dom'),
    },
    extra: {
      entry: {
        app: [ path.resolve('./demo/src/index.js') ]
      }
    }
  },
};
