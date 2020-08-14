import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBar from 'webpackbar';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';

import CopyPlugin from 'copy-webpack-plugin';
import { __DEV__, PROJECT_NAME, PROJECT_ROOT, HMR_PATH, RESOLV_PATH } from '../utils/constants';

const htmlMinifyOptions = {
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
    minifyURLs: true,
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    removeScriptTypeAttributes: true,
};
const commonConfig: Configuration = {
    context: PROJECT_ROOT,
    entry: ['react-hot-loader/patch', RESOLV_PATH(PROJECT_ROOT, './src/index.tsx')],
    output: {
        publicPath: './',
        path: RESOLV_PATH(PROJECT_ROOT, './dist'),
        filename: 'js/[name]-[hash].bundle.js',
        // 加盐 hash
        hashSalt: PROJECT_NAME,
    },
    resolve: {
        // 我们导入ts 等模块一般不写后缀名，webpack 会尝试使用这个数组提供的后缀名去导入
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                // 开启缓存
                options: { cacheDirectory: true },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        // 显示打包进度
        new WebpackBar({
            name: 'react-typescript-boilerplate',
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
            // 类型不好定义，any 一时爽...
            // 定义一些可以在模板中访问的模板参数
            templateParameters: (...args: any[]) => {
                const [compilation, assets, assetTags, options] = args;
                const rawPublicPath = commonConfig.output!.publicPath!;
                return {
                    compilation,
                    webpackConfig: compilation.options,
                    htmlWebpackPlugin: {
                        tags: assetTags,
                        files: assets,
                        options,
                    },
                    // 除掉 publicPath 的反斜杠
                    PUBLIC_PATH: rawPublicPath.endsWith('/')
                        ? rawPublicPath.slice(0, -1)
                        : rawPublicPath,
                };
            },
        }),
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
