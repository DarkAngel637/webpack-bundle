// 打包 css 和 打包 less ,sass 不能一起,还有插件等, 只能用 css-loader 和 sass loader
const { join } = require('path');
// 热更新的插件在 webpack 里自带
const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 压缩和导出 css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.bundle.html',
  inject: 'body',
});

module.exports = {
  // 打包文件的模式
  mode: 'development',
  // 打包总文件入口
  entry: join(__dirname, 'index.js'),
  // 打包出来的文件信息(路径,文件名)
  output: {
    path: join(__dirname, 'dist'),
    // 打包文件 以文件名加4位哈希值命名
    // filename: "./index[hash:4].js",
    filename: './index.js',
  },
  module: {
    rules: [
      //  什么是loader? 加载非js 的js 模块
      // es6+ 转 es5 需要的依赖: babel-loader @babel/preset-env @babel/core
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // 打包sass  要加载的loader : style-loader,css-loader,sass/less-loader --- yarn add style-loader,css-loader,sass/less-loader sass node-sass (node-sass 和sass 在打包sass 的时候需要) ; loader 的执行顺序: 从右到左
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          // 'style-loader',
          // 压缩 css 的loader,替换掉原有的style-loader,导出用的是插件里的loader 和整个插件,
          MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
      // // 打包css
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader'],
      // },
      /* 面试官 ： style-loader 和 css-loader 的区别？( css 和 sass,less 不能一起打包?)

css-loader ，主要是 解析我们编写的 css ,因为 css 本身并不是一个模块，所以在js 中导入 css 你就需要 css-loader 来识别它们，而 style-loader 就是将 css-loader 解析完的结果 ，作为样式内容插入到 html style标签内，这样我们样式就生效了。 */
      // 打包 html
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  // 压缩 css 陪在这里不生效
  // 打包生成 html 模板,new HotModuleReplacementPlugin() 为热更新插件,webpack 自带的,这个不能再生产环境中使用; 压缩用的是插件 optimizations.minimizer 的数组中添加,导出用的是插件里面的loader 和整个插件
  plugins: [
    htmlPlugin,
    new HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.bundle[hash:8].css',
    }),
    new CssMinimizerPlugin(), // 配置在 plugins 里,不能像官网似的
  ],

  // 配置 webpack-dev-server
  devServer: {
    static: {
      directory: join(__dirname, './src'),
    },
    compress: true,
    port: 3000,
  },
  // 配置source-map
  devtool: 'source-map',
  resolve: {
    // 路径别名
    alias: {
      '@': './src',
    },
    extensions: ['.webp'], // 默认扩展名
    // modules: ["node_modules"], // 解析模块时的搜索位置
  },
};
// 还差 file-loader,url-loader
