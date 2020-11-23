const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@board': path.resolve(__dirname, 'src/board'),
      '@modules': path.resolve(__dirname, 'src/board/modules'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@actions': path.resolve(__dirname, 'src/redux/actions'),
      '@reducers': path.resolve(__dirname, 'src/redux/reducers'),
      '@store': path.resolve(__dirname, 'src/redux/store'),
    },
  },
};
