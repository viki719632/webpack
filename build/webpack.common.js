const path = require('path');
const webpack = require('webpack');
require('../postcss.config');
const htmlWebpackPlugin = require('html-webpack-plugin');

//paths
const srcPath = path.join(__dirname,'..', 'src');
const distPath = path.join(__dirname, '..','dist');
const pagesPath = path.join(srcPath,'pages');
const jsPath = path.join(srcPath,'js');
const cssPath = path.join(srcPath,'css');
const componentPath = path.join(srcPath,'component');
const ImgPath = path.join(srcPath,'component');

module.exports = {
    //single page mode sitting
    // entry: path.join(srcPath, 'index'),

    //multiply pages mode sitting
    entry: {
        index: path.join(pagesPath, 'index/index.js'),
        post: path.join(pagesPath, 'post/index.js'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: srcPath,
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 小于 5kb 的图片用 base64 格式产出
                        // 否则，依然延用 file-loader 的形式，产出 url 格式
                        limit: 5 * 1024,
                        name: '[name]-[hash].[ext]',

                        // 打包到 img 目录下
                        outputPath: '/img/',

                        // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
                        // publicPath: 'http://cdn.abc.com'
                    }
                }
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(pagesPath, 'index/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            vendor: './vendor.dll.js', //与dll配置文件中output.fileName对齐
        }),
        new htmlWebpackPlugin({
            template: path.join(pagesPath, 'post/index.html'),
            filename: 'post.html',
            chunks: ['post'],
            vendor: './vendor.dll.js', //与dll配置文件中output.fileName对齐
        }),
        new webpack.ProvidePlugin({
            _: 'lodash', //所有页面都会引入 _ 这个变量，不用再import引入
            jQuery: 'jquery',
            $: 'jquery',
        }),
        /*找到上一步生成的`manifest.json`文件配置到`plugins`里面*/
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(path.join(__dirname,'..','manifest','js','manifest.json'))
        })
    ],
    resolve:{
        //配置别名，在项目中可缩减引用路径
        alias: {
            //Follow variables can not console on js files.
            '@': srcPath,
            PATHS_PATH: pagesPath,
            JS_PATH: jsPath,
            CSS_PATH: cssPath,
            COMPONENT_PATH: componentPath,
            IMGPATH: ImgPath,
        }
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: "all"
    //     }
    // },
    // optimization: {
    //     // 分割代码块
    //     splitChunks: {
    //         // 缓存分组
    //         cacheGroups: {
    //             // 第三方模块
    //             vendor: {
    //                 priority: 1, // 权限更高，优先抽离，重要！！！
    //                 test: /node_modules/,
    //                 chunks: 'initial',
    //                 minSize: 0,  // 大小限制
    //                 minChunks: 1  // 最少复用过几次
    //             },
    //
    //             // 公共的模块
    //             common: {
    //                 chunks: 'initial',
    //                 minSize: 0,  // 公共模块的大小限制
    //                 minChunks: 2  // 公共模块最少复用过几次
    //             }
    //         }
    //     }
    // },

};