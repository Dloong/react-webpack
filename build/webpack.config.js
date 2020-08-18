const path = require('path')
const webpack = require('webpack')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin') // 打包运行文字
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css 压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css 文件分离
module.exports = {
    entry: "./src/main.tsx",
    mode: "development",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
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
        rules: [

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.(tsx?|js)$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                // 开启缓存
                options: {
                    cacheDirectory: true
                },
                exclude: /node_modules/,
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
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    {
                        loader: "px2rem-loader",
                        options: {
                            remunit: 75,
                            remPrecision: 8
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css' //输出的css文件名，放置在dist目录下
        }),

        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        })
    ],
    // devtool: "eval",  //sorrce map
    output: {
        filename: "[name].[hash].js",
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}