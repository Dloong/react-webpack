import path from 'path';
import { argv } from 'yargs';
import envsConfig from '../../config';

const __DEV__ = process.env.NODE_ENV !== 'production';
const ENABLE_ANALYZE = !!argv.analyze;
const ENABLE_OPEN = argv.open as true | string;

const HOST = '127.0.0.1';
const DEFAULT_PORT = 3000;
const COPYRIGHT = `/** @preserve Powered by react-typescript-boilerplate (https://github.com/Dloong/react-webpack) */`;

const PROJECT_ROOT = path.resolve(__dirname, '../../');
const PROJECT_NAME = 'react-ts-webpack';
const HMR_PATH = '/__webpack_hmr';
const RESOLV_PATH = path.resolve;

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
const envType = (argv.env as string) ?? 'dev';
const REACT_APP_ENV = Object.assign({},{NODE_ENV: process.env.NODE_ENV}, envsConfig[envType].react_app)
export {
    __DEV__,
    ENABLE_ANALYZE,
    ENABLE_OPEN,
    HOST,
    DEFAULT_PORT,
    COPYRIGHT,
    PROJECT_NAME,
    PROJECT_ROOT,
    HMR_PATH,
    RESOLV_PATH,
    REACT_APP_ENV,
    htmlMinifyOptions
};
