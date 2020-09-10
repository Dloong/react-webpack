import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBar from 'webpackbar';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import MomentLocalesPlugin from 'moment-locales-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import LodashModuleReplacementPlugin from "lodash-webpack-plugin";
import InterpolateHtmlPlugin from "../plugins/InterpolateHtmlPlugin"
// css 文件分离
import { __DEV__, PROJECT_ROOT, HMR_PATH, RESOLV_PATH, htmlMinifyOptions, REACT_APP_ENV } from '../utils/constants';


const commonConfig: Configuration = {
    context: PROJECT_ROOT,
    entry: ['react-hot-loader/patch', RESOLV_PATH(PROJECT_ROOT, './src/index.tsx')],
    output: {
        path: RESOLV_PATH(PROJECT_ROOT, './dist'),
        filename: 'js/[name]-[hash].bundle.js',
        publicPath: '/'
    },
    resolve: {
        // 我们导入ts 等模块一般不写后缀名，webpack 会尝试使用这个数组提供的后缀名去导入
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: [
            RESOLV_PATH('src'),
            RESOLV_PATH('node_modules')
          ],
    },

    module: {
        rules: [
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
                test: /.(png|jpg|jpeg|gif|svg)$/,
                use: [{
                    // url-loader 可以将较小资源转化base64
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        publicPath: "imgs/",  // 属于file-loader的属性
                        outputPath: "imgs/"  // 属于file-loader的属性
                    }
                }],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(REACT_APP_ENV)
        }),
        // 显示打包进度
        new WebpackBar({
            name: 'react-typescript-webpack',
            color: '#61dafb',
        }),
        // 循环依赖
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: PROJECT_ROOT,
        }),
        // 处理错误通知
        new FriendlyErrorsPlugin(),
        new LodashModuleReplacementPlugin(),
        new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'id'],
        }),
        new CopyPlugin({
            patterns: [
                {
                    context: RESOLV_PATH(PROJECT_ROOT, './public'),
                    from: '*',
                    to: RESOLV_PATH(PROJECT_ROOT, './dist'),
                    toType: 'dir',
                    globOptions: {
                        ignore: ['index.html'],
                    },
                },
            ],
        }),
        new HtmlWebpackPlugin({
            // HtmlWebpackPlugin 会调用 HtmlMinifier 对 HTMl 文件进行压缩
            // 只在生产环境压缩
            minify: __DEV__ ? false : htmlMinifyOptions,
            // 指定 html 模板路径
            template: RESOLV_PATH(PROJECT_ROOT, './public/index.html'),
            inject: true
        }),
        new InterpolateHtmlPlugin(HtmlWebpackPlugin, {'PUBLIC_URL': '/'})
    ],
};

if (__DEV__) {
    // 开发环境下注入热更新补丁
    // reload=true 设置 webpack 无法热更新时刷新整个页面，overlay=true 设置编译出错时在网页中显示出错信息遮罩
    (commonConfig.entry as string[]).unshift(
        `webpack-hot-middleware/client?path=${HMR_PATH}&reload=true&overlay=true`,
    );
}
export default commonConfig;
