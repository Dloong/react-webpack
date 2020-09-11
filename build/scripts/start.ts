import chalk from 'chalk';
import logSymbols from 'log-symbols';
import { argv } from 'yargs';
import express from 'express';
import webpack from 'webpack';
import historyFallback from 'connect-history-api-fallback';
import { Options } from 'http-proxy-middleware/dist/types';
import { createProxyMiddleware } from 'http-proxy-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../configs/webpack.dev';
import envsConfig from '../../config';
import openBrowsers from "../react-dev-utils/openBrowser";
import {choosePort, prepareUrls, IprepareUrl }from "../react-dev-utils/getPortAndPath";

const app = express();
const compiler = webpack(webpackConfig);
// handle fallback for HTML5 history AP
app.use(historyFallback());

const HOST = process.env.HOST || '0.0.0.0'
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
// Tools like Cloud9 rely on this.
const DEFAULT_PORT = Number.parseInt(process.env.PORT, 10) || 3000;

// 修饰链接的辅助函数, 修改颜色并添加下划线
function renderLink(str: string) {
    return chalk.magenta.underline(str);
}
// 设置服务器代理
function httpProxy(): any {
    const envType = (argv.env as string) ?? 'dev';
    const proxyTable = envsConfig[envType].proxyTable as Options;
    Object.entries(proxyTable).forEach(([path, options]) => {
        const from = path;
        const to = options.target as string;
        console.log(`proxy ${renderLink(from)} ${chalk.green('->')} ${renderLink(to)}`);
        // eslint-disable-next-line no-param-reassign
        if (!options.logLevel) options.logLevel = 'warn';
        app.use(path, createProxyMiddleware(options));
        // 如果需要更灵活的定义方式，请在下面直接使用 app.use(path, proxyMiddleware(options)) 定义
    });
    process.stdout.write('\n');
}

// 打开浏览器
async function openBrowser(urls: IprepareUrl) {

    openBrowsers(urls.localUrlForBrowser)
        // 编译完成时执行
        compiler.hooks.done.tap('open-browser-plugin',  () => {
            console.log(`🚀 DevServer is running at
                    ${chalk.greenBright(urls.localUrlForBrowser)} ${logSymbols.success}
                    ${chalk.greenBright(urls.lanUrlForTerminal)} ${logSymbols.success}
            `);
        });
}

// 设置webpack-dev-middleware
function setupMiddleware() {
    httpProxy();
    // Tell express to use the webpack-dev-middleware and use the webpack.config.js
    // configuration file as a base.
    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: webpackConfig.output!.publicPath!,
            // 只在发生错误或有新的编译时输出
            stats: 'minimal',
        }),
    );
    const hotMiddlewareOptions: webpackHotMiddleware.ClientOptions = {
        // 编译出错会在网页中显示出错信息遮罩
        overlay: true,
        // webpack 卡住自动刷新页面
        reload: true,
    };
    app.use(webpackHotMiddleware(compiler, hotMiddlewareOptions));
}

async function start() {

    const PORT = await choosePort(HOST, DEFAULT_PORT);
    const urls = prepareUrls(
        protocol,
        HOST,
        PORT,
       '/'
     );
     console.log(urls);

    setupMiddleware();
    // Serve the files on port 3000.
    const httpSever = app.listen(PORT, function () {
        console.log('App is running...');
        openBrowser(urls);
    });

    // 我们监听了 node 信号，所以使用 cross-env-shell 而不是 cross-env
    // 参考：https://github.com/kentcdodds/cross-env#cross-env-vs-cross-env-shell
    ['SIGINT', 'SIGTERM'].forEach((signal: any) => {
        process.on(signal, () => {
            // 先关闭 devServer
            httpSever.close();
            // 在 ctrl + c 的时候随机输出 'See you again' 和 'Goodbye'
            console.log(
                chalk.greenBright.bold(`\n${Math.random() > 0.5 ? 'See you again' : 'Goodbye'}!`),
            );
            // 退出 node 进程
            process.exit();
        });
    });
}

// 当直接从Node.js运行文件时，require.main设置为其模块。这意味着可以通过测试require.main ===模块来确定文件是否已经直接运行。
if (require.main === module) {
    start();
}
