module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    ['@vue/cli-plugin-babel/preset', {
      useBuiltIns: 'entry',
      polyfills: ['es6.promise', 'es6.symbol', 'es6.import']
    }]
  ],
  plugins: [
    [
      'component',
      {
        'libraryName': 'element-ui',
        // 'style': false
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}