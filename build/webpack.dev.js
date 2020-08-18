const webpack = require('webpack')
const {merge}  = require('webpack-merge')
const config = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(config, {
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "Test Demo",
            template: "./public/index.html"
        })
    ]
})