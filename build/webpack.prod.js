const path = require('path');
const webpackCommonConf = require('./webpack.common.js');
const { smart } = require('webpack-merge');
const srcPath = path.join(__dirname,'..', 'src');
const distPath = path.join(__dirname, '..','dist');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 清空打包目录的插件
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = smart(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: 'js/bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
        path: distPath,
        // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                loader: [
                    MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader,
                    // 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2 //declare how many loader before css-loader.
                                            //in this case,postcss-loader and less-loader is before this loader.
                        }
                    },
                    'postcss-loader', 'less-loader'
                ]  // loader 的执行顺序是：从后往前
            }
        ],
        noParse: /jquery|lodash/,//不去解析某些 lib 其内部的依赖，即确定这些 lib 没有其他依赖，提高解析速度。
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/app.[contentHash:8].css'
        }),
        new webpack.DefinePlugin({
            // 注意：此处 webpack.dev.js 中写 'development' ，webpack.prod.js 中写 'production'
            ENV: JSON.stringify('production'),
        }),
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.join(srcPath, 'doc'),  // 将 src/doc 拷贝到 dist/doc
        //         to: path.join(distPath, 'doc')
        //     }
        // ]),
    ],
    resolve: {
        extensions: [".js", ".json"]
    },
    devtool: 'source-map',
});