# 说明

>  webpack 多页面打包练习

## 项目运行（nodejs 6.0+）
``` bash
# 克隆到本地 git@github.com:viki719632/webpack.git

# 进入文件夹
cd webpack

# 安装依赖
npm install 或 yarn(推荐)

生成dll 动态链接库(必须!!!)
npm run dll

# 开启本地服务器localhost:3000
npm run dev

# 发布环境
npm run build
```



# 功能描述
``` bash
html
    1.支持模块复用
    2.支持多页面，多入口(需要配置webpack)

样式
    1.支持less
    
js
    1.es6转es5
    

开发环境
   1.支持热加载
    (该环境不会产生独立的样式文件)

发布环境
    1.代码压缩
    2.版本号更新
   
```



