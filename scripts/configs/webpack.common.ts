import { resolve } from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBar from 'webpackbar';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import { projectRoot, resolvePath } from '../env';
import { PROJECT_ROOT } from '../utils/constants';

const commonConfig: Configuration = {
    context: projectRoot,
    entry: './src/index.tsx',
    output: {
        publicPath: '/',
        path: resolvePath(projectRoot, './dist'),
        filename: 'js/[name]-[hash].bundle.js',
        // 加盐 hash
        hashSalt: 'react typescript boilerplate',
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
            // react 蓝
            color: '#61dafb',
        }),
        // 处理错误通知
        new FriendlyErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(PROJECT_ROOT, './public/index.html'),
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
                minifyURLs: true,
            },
        }),
    ],
};
export default commonConfig;
