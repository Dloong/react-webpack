const express = require('express');
const webpack = require('webpack');
const chalk = require('chalk')
const webpackDevMiddleware = require('webpack-dev-middleware');
const getPort = require('get-port');
const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  quiet: true
}));


async function serve() {
  const HOST = '127.0.0.1';
  // 4个备选端口，都被占用会使用随机端口
  const PORT = await getPort({
    port: [8080, 8081, 8082, 8888]
  });
  const ipAddress = `http://${HOST}:${PORT}`;
  const localhost = `http://localhost:${PORT}`;
  const address = `${chalk.greenBright(ipAddress)} or ${chalk.greenBright(localhost)}`;

  const httpServer = app.listen(PORT, HOST, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(
      `App is running at ${chalk.magenta.underline(address)}`,
    );
  });
}

serve()