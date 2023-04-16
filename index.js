// vue 部分的动态路由下面匹配以及后一页

// 打包 html 的时候要引入 html
// import './src/index.html';
// 导出 css 文件的时候才需要引入 css 文件
// import './style2.css'; // 打包的时候提示没有 loader 那是没配置 css 文件的处理类型 但配置之后还是有问题
////////////////////////不能直接打包css 文件,倒是能打包 scss , less //////////////////////////////////

import './style.scss';
const aaa = async () => {
  const result = await bbbb();
};
console.log('复习webpack');

function aaaa(a = 1, b = 2) {
  console.log(arguments, 'arguments');
}
aaaa();
