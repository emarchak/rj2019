const { dev } = require('./dev.config.env');

const config = {
  build: {
    srcPath: './src',
    outputPath: './docs'
  },
  site: {
    title: 'RJ2019 Template site',
  }
};

module.exports = {...dev, ...config};
