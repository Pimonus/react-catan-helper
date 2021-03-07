const path = require('path');

module.exports = {
  webpack: {
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@board': path.resolve(__dirname, 'src/board'),
      '@modules': path.resolve(__dirname, 'src/board/modules'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@actions': path.resolve(__dirname, 'src/redux/actions'),
      '@middlewares': path.resolve(__dirname, 'src/redux/middlewares'),
      '@reducers': path.resolve(__dirname, 'src/redux/reducers'),
      '@store': path.resolve(__dirname, 'src/redux/store'),
      '@types': path.resolve(__dirname, 'src/types'),
    },
  },
};
