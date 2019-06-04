const path = require('path');
const webpackCommonConf = require('./webpack.common.js');
const { smart } = require('webpack-merge');
const srcPath = path.join(__dirname,'..', 'src');
const distPath = path.join(__dirname, '..','dist');


module.exports = smart(webpackCommonConf, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.less$/,
                loader: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                },'postcss-loader', 'less-loader']  // loader 的执行顺序是：从后往前
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // 注意：此处 webpack.dev.js 中写 'development' ，webpack.prod.js 中写 'production'
            ENV: JSON.stringify('development'),
        }),
    ],
    devtool: 'cheap-module-eval-source-map',
    watch: true, // 开启监听文件更改，自动刷新
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
        poll:1000 //每秒询问的文件变更的次数
    },
    devServer: {
        port: 3000,
        progress: true,  // 显示打包的进度条
        contentBase: distPath,  // 根目录
        open: true,  // 自动打开浏览器
        compress: true  // 启动 gzip 压缩
    }
});