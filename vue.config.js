const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                /*  pathRewrite: { '^/api': '' },*/
                changeOrigin: true, //  target是域名的话，需要这个参数，
                secure: false //  设置支持https协议的代理
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('src', resolve('src'))
            .set('components', resolve('src/components'))
            .set('constants', resolve('src/constants'))
            .set('container', resolve('src/container'))
            .set('store',  resolve('src/store'))
            .set('utils', resolve('src/utils'))
    },
    lintOnSave: false // 禁用eslint
}