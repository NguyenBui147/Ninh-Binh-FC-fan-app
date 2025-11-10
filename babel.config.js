module.exports = {
  presets: ['module:@react-native/babel-preset'],
  
  plugins: [

    
    // Plugin react-native-dotenv (sửa lại tên module)
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      }
    ]
  ]
};