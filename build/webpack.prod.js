const webapck = require('webpack')
const merge  = require('webpack-merge')
const config = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = merge (config, {
    plugins:[
        new HtmlWebpackPlugin({
            title: "Test Demo",
            template: "./public/index.html",
            // 压缩html
            minify: {
                // 移除注释
                removeComments: true,
                // 不要留下任何空格
                collapseWhitespace: true,
                // 当值匹配默认值时删除属性
                removeRedundantAttributes: true,
                // 使用短的doctype替代doctype
                useShortDoctype: true,
                // 移除空属性
                removeEmptyAttributes: true,
                // 从style和link标签中删除type="text/css"
                removeStyleLinkTypeAttributes: true,
                // 保留单例元素的末尾斜杠。
                keepClosingSlash: true,
                // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
                minifyJS: true,
                // 缩小CSS样式元素和样式属性
                // minifyCSS: true,
                // 在各种属性中缩小url
                minifyURLs: true
            }
        }),
    ]
})