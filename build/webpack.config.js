const path = require('path');
module.exports = {
    // mode 可选 development 或 production ，默认为后者
    // production 会默认压缩代码并进行其他优化（如 tree shaking）
    mode: 'development',
    entry: path.join(__dirname, 'src', 'index'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    }
};