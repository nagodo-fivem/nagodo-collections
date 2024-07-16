const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Because CEF has issues with loading source maps properly atm,
      // lets use the best we can get in line with `eval-source-map`
      if (webpackConfig.mode === 'development' && process.env.IN_GAME_DEV) {
        webpackConfig.devtool = 'eval-source-map'
        webpackConfig.output.path = path.join(__dirname, 'build')
      }
      
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        alias: {
          '@': path.resolve(__dirname, './'),
          '@components': path.resolve(__dirname, './src/components'),
          '@utils': path.resolve(__dirname, './src/utils'),
          '@hooks': path.resolve(__dirname, './src/hooks'),
          '@helpers': path.resolve(__dirname, './src/helpers'),
          '@sounds': path.resolve(__dirname, './src/sounds')
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'] // add other extensions if needed
      };
      
      return webpackConfig
    },
    
  },

  devServer: (devServerConfig) => {
    if (process.env.IN_GAME_DEV) {
     // Used for in-game dev mode
     devServerConfig.devMiddleware.writeToDisk = true
    }

    return devServerConfig
  }
}
