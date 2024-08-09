'use strict';
const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
// 统一路径解析
function resolve(dir) {
  return path.resolve(__dirname, dir);
}

// 包括生产和开发的环境配置信息
module.exports = {
  settings: {
    enableESLint: false, // 调试模式是否开启ESLint，默认开启ESLint检测代码格式
    enableESLintFix: false, // 是否自动修正代码格式，默认不自动修正
    enableStyleLint: false, // 是否开启StyleLint，默认开启ESLint检测代码格式
    enableStyleLintFix: false // 是否需要StyleLint自动修正代码格式
  },
  webpack: {
    resolve: {
      // webpack的resolve配置
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.esm.js', '.umd.js', '.min.js', '.json', '.mjs'],
      alias: {
        '@': resolve('src'),
        $utils: resolve('src/common/utils'),
      },
      // conditionNames: ['require']
    },
    createDeclaration: true, // 打包时是否创建ts声明文件
    ignoreNodeModules: false, // 打包时是否忽略 node_modules
    allowList: [], // ignoreNodeModules为true时生效
    externals: ['react-pdf'],
    projectDir: ['src'],
    template: resolve('./src/index.html'), // 使用自己的html模板
    // cssLoaderUrl: true,
    // cssLoaderUrlDir: 'editor/fontawesome-free',
    // moduleRules: [], // 用于配置自定义loaders
    moduleRules: [],
    plugins: [], // 用于配置自定义plugins
  },
  dev: {
    entry: { // 本地调试模式的入口
      index: [
        './src/Editor.jsx'
      ],
      saas: './src/SaasEditor.jsx',
      modelEditor: './src/ModelDataEditor.jsx',
      login: './src/Login.tsx'
    },
    // 用于开启本地调试模式的相关配置信息
    NODE_ENV: 'development',
    ignoreNodeModules: false, // 打包时是否忽略 node_modules
    port: 80,
    autoOpenBrowser: true,
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '',
    hostname: 'localhost',
    // 本地联调线上amis-saas应用需要
    proxyTable: { // 接口代理
      '/api': {
        target: 'http://gzbh-sandbox103-store-2620.gzbh:8091',
        ws: true,
        changeOrigin: true
      },
      '/csrfToken': {
        target: 'http://gzbh-sandbox103-store-2620.gzbh:8091',
        ws: true,
        changeOrigin: true
      },
      '/verifyEmail': {
        target: 'http://gzbh-sandbox103-store-2620.gzbh:8091',
        ws: true,
        changeOrigin: true
      },
      '/login': {
        target: 'http://gzbh-sandbox103-store-2620.gzbh:8091',
        ws: true,
        changeOrigin: true
      },
      // 以下接口代理到jsonql接口服务
      // 代理到线上jsonql服务
      '/design': 'http://gzbh-aipage-006.gzbh.baidu.com:8764',
      '/resource': 'http://gzbh-aipage-006.gzbh.baidu.com:8764',
      /*
      // 代理到本地jsonql服务
      '/design': 'http://localhost:8989',
      '/resource': 'http://localhost:8989'
      */
    },
    cssSourceMap: false,
    closeHotReload: true, // 是否关闭热更新
    closeEditorClient: true // 是否关闭自动注入editor
  },
  build: {
    entry: { // 构建Demo入口
      index: [
        './src/Editor.jsx'
      ]
    },
    // 用于构建生产环境代码的相关配置信息
    NODE_ENV: 'development', // development production
    assetsRoot: resolve('./demo/1.5.8'), // 打包后的文件绝对路径（物理路径）
    assetsPublicPath: 'https://aisuda.github.io/amis-reports-demo/demo/1.5.8/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '', // 资源引用二级路径
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css', 'json'],
    plugins: [new MonacoWebpackPlugin()],
    bundleAnalyzerReport: false
  }
};
