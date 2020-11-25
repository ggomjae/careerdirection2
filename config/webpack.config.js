const path = require('path');

module.exports = {
  entry: './src/App.ts', // 시작점 
  module: {
    rules: [
      {
        test: /\.tsx?$/,    // .tsx 모든 파일 지정 test 객체로
        use: 'ts-loader',   // 로더 설정 
        exclude: /node_modules/    // node_modules는 제외시키기
      }
    ]
  },
  devtool: 'source-map',
  target: 'node',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};