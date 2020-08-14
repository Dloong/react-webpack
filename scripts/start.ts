import chalk from 'chalk';
import getPort from 'get-port';
import logSymbols from 'log-symbols';
import open from 'open';
import { argv } from 'yargs';
import express, { Express } from 'express';
import webpack, { Compiler, Stats } from 'webpack';
import historyFallback from 'connect-history-api-fallback';
import cors from 'cors';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proxy from './proxy';
import devConfig from './configs/webpack.dev';
// import { hmrPath } from './env';

function openBrowser(compiler: Compiler, address: string) {
    if (argv.open) {
        let hadOpened = false;
        // 编译完成时执行
        compiler.hooks.done.tap('open-browser-plugin', async (stats: Stats) => {
            // 没有打开过浏览器并且没有编译错误就打开浏览器
            if (!hadOpened && !stats.hasErrors()) {
                await open(address);
                hadOpened = true;
            }
        });
    }
}

function setupMiddlewares(compiler: Compiler, server: Express) {
    // 设置代理
    proxy(server);

    // 使用 browserRouter 需要重定向所有 html 页面到首页
    server.use(historyFallback());

    // 开发 chrome 扩展的时候可能需要开启跨域，参考：https://juejin.im/post/5e2027096fb9a02fe971f6b8
    server.use(cors());

    const devMiddlewareOptions: webpackDevMiddleware.Options = {
        publicPath: '/',
        // 只在发生错误或有新的编译时输出
        stats: 'minimal',
        // 需要输出文件到磁盘可以开启
        // writeToDisk: true
    };
    server.use(webpackDevMiddleware(compiler, devMiddlewareOptions));

    const hotMiddlewareOptions: webpackHotMiddleware.ClientOptions = {
        // sse 路由
        // path: hmrPath,
        // 编译出错会在网页中显示出错信息遮罩
        overlay: true,
        // webpack 卡住自动刷新页面
        reload: true,
    };
    server.use(webpackHotMiddleware(compiler, hotMiddlewareOptions));
}

async function start() {
    const HOST = '127.0.0.1';
    // 4个备选端口，都被占用会使用随机端口
    const PORT = await getPort({ port: [8080, 8081, 8082, 8888] });
    const ipAddress = `http://${HOST}:${PORT}`;
    const localhost = `http://localhost:${PORT}`;
    const address = `${chalk.greenBright(ipAddress)} or ${chalk.greenBright(localhost)}`;

    // 加载 webpack 配置
    const compiler = webpack(devConfig);
    openBrowser(compiler, localhost);

    const devServer = express();
    setupMiddlewares(compiler, devServer);

    const httpServer = devServer.listen(PORT, HOST, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        // logSymbols.success 在 windows 平台渲染为 √ ，支持的平台会显示 ✔
        console.log(
            `DevServer is running at ${chalk.magenta.underline(address)} ${logSymbols.success}`,
        );
    });

    // 我们监听了 node 信号，所以使用 cross-env-shell 而不是 cross-env
    // 参考：https://github.com/kentcdodds/cross-env#cross-env-vs-cross-env-shell
    ['SIGINT', 'SIGTERM'].forEach((signal: any) => {
        process.on(signal, () => {
            // 先关闭 devServer
            httpServer.close();
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
