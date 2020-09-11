## About Dev-server

#### 背景和条件

我们通常情况下输入命令 `npm run start` 可以直接打开一个 localhost 页面来显示自己的网页内容。这个我们可以通过配置 webpack 内置的 dev-server 来实现。实际上 `webpack-dev-server` 就是使用 `express` 以及一些 devServer 相关的中间件开发的。所以我也可是尝试使用 node 搭配一些 webpack 的中间件来开发一个 dev-server。先从基础的来搭建的话，先选用[webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)和[webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware)。
