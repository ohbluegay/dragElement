const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
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