const path = require('path')
const webpack = require('webpack')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin') // 打包运行文字
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css 压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css 文件分离
module.exports = (env, argv) => {
    return {
        entry: "./src/main.js",
        devServer: {
            contentBase: './dist',
            hot: true
        },
        // stats: "errors-only",
        performance: {
            // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
            hints: "warning",
            // 开发环境设置较大防止警告
            // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
            maxEntrypointSize: 5000000,
            // 最大单个资源体积，默认250000 (bytes)
            maxAssetSize: 3000000
        },
        module: {
            rules: [{
                    test: /.js$/,
                    use: [{
                        // cacheDirectory = true 使用缓存，提高性能，将 babel-loader 提速至少两倍
                        loader: "babel-loader?cacheDirectory",
                    }],
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'

                    ]
                },
                {
                    test: /.(png|jpg|jpeg|gif|svg)$/,
                    use: [{
                        // url-loader 可以将较小资源转化base64
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }],
                },
                {
                    test: /.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        "sass-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins:() => [
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                }
            }),
            new FriendlyErrorsWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new CleanWebpackPlugin(),
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
            new MiniCssExtractPlugin({
                filename: '[name]_[contenthash:8].css' //输出的css文件名，放置在dist目录下
            }),

            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano')
            })
        ],

        output: {
            filename: "[name].[hash].js",
            chunkFilename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}