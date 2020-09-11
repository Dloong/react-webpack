# TWR基础构建工具

<div style="text-align: center">

![Node 12.7.0](https://img.shields.io/static/v1?label=Node&message=V12.7.0&color=<COLOR>) ![Webpack 4.44.1](https://img.shields.io/static/v1?label=Webpack&message=V4.44.1&color=<COLOR>) ![Node 12.7.0](https://img.shields.io/static/v1?label=Version&message=V1.0.0&color=orange) 

</div>
<p style="text-align: center">🚀 一款适用于ts + react + webpack的脚手架 💗</p>


![技术架构](https://user-images.githubusercontent.com/54270712/92572000-6c1c8700-f2b6-11ea-828f-f12f2df9ccd3.png)

## 背景

一般我们做一件事情都是为了解决另一件事情的痛点。那么另一件事情的痛点就是我们做这件事情的背景。

第一，说痛点。前一段时间，公司的前端框架由Vue转向React。原因呢有几点，一是React更加灵活的组件定义方式，二是为了更好的拥抱Typescript，三是为了提升自身价值。。带着美好的憧憬我就奔向了React，直到我碰上Create-React-App。。。

我个人觉得，`cra` 没 `vue-cli` 设计的好，无论是易用性和扩展性都完败，cra 不方便修改 webpack 配置，vue-cli 不但易于用户修改 webpack 配置，还能保存模板以及自带插件系统。对用惯了`Vue-cli`的我来说，不让我修改配置，我心里很难受啊。很早之前自己就想写一份基于webpack的项目构建配置，但是因为种种原因，比如说：懒。。就一直搁置了。但是现在用的`cra` 让我用的特别不舒服。于是，我变勤快了。。

## 流程
![流程](https://user-images.githubusercontent.com/54270712/92572113-92422700-f2b6-11ea-8ee8-f129c2b468c6.png)

启动命令已经在package.json中配置好了。上图是各个命令所经过的一些脚本文件，至于具体的文件内容就不详细解释。

## webpack基础配置

这里讲到的是webpack最基本的配置。Webpack的运行的流程是一个串行的过程，从启动到结束依次执行以下流程。

1. 初始化：启动构建，读取与合并配置参数，加载plugin，实例化Compiler。
2. 编译： 从Entry出发，对每个module串行调用对应的loader去翻译文件内容。对于一个module中依赖的另外的module，递归的进行编译处理。
3. 输出：对编译的Module组成chunk，把chunk转化成文件，输出到文件系统。

以上的大致的步骤，具体的步骤会在下一篇介绍。基本的配置不多说，可以自行参考[官网](https://webpack.docschina.org/configuration/)

说一下肯定需要的：

1、loader：包括css-loader、sass-loader、babel-loader。正常情况下我们写ts需要用到ts的loader以及识别jsx语法的loader。在这个项目中，我统一用babelloader来处理了。具体的会在babel-loder那一块说一下。

2、plugin： 着重说一下htmlwebpackplugin。这个plugin相当于是模版，我们看到的所有页面都是根据这个模版绘制的。在用create-react-app的时候，包括我在用vue-cli的时候。在html模版上可以看到有一些变量的存在。虽然htmlwebpack也可以注入变量但是注入的是这样子的：

```javascript
<title><%= htmlWebpackPlugin.options.title %></title>
```

但是在react-script中呢，他是这样婶儿的：

```javascript
<link rel="icon" href="%PUBLIC_URL%favicon.ico" />
```

我个人觉得第二种是好的，于是我就去翻了翻react-script的源码，大致介绍如下，具体实现原理有兴趣可以看一下[源码](https://github.com/facebook/create-react-app/blob/master/packages/react-dev-utils/InterpolateHtmlPlugin.js)，只有十多行。

```
// Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      // It will be an empty string unless you specify "homepage"
      // in `package.json`, in which case it will be the pathname of that URL.
  new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw)
```

3、output: 文件输入的路径以及名字。这里主要提到的是webapck的文件指纹策略。他的作用其实就是用来做文件版本管理。当我们第一次访问这些资源的时候，浏览器会将这些资源压入缓存中，例如：

```
http://localhost:3000/imgs/xxx_eb0a73.png
```

这是一个png的图片，这个资源会在第一次访问的时候将其压入缓存中。当我们第二次访问的时候，看到这一串请求信息的时候，就会直接从缓存中提取，这样会减少一下请求。如果我们把这个名字换一下，它请求的就不再是缓存中的信息，而是一个新的资源。所以，我们就是利用这一点，通过在资源名称上添加hash来确定是否使用缓存。这里涉及到三个概念：

chunkhash：和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值。

hash：和整个项目的构建有关，只要项目文件有修改，整个项目构建的hash值就会改变。

contenthash：根据文件内容来定义hash，文件内容不变，则contenthash不变。

我们可以通过这三个不同的hash来做版本标记。

## webpack-dev-server(本地环境配置)

通常我们在配置本地环境的时候选择官方封装好的[devServer](https://webpack.docschina.org/configuration/dev-server/)通过命令行的方式来启动。但是在这里我们并不会选择用命令行工具，而是选择用node api。官方写的[教程](https://github.com/webpack/webpack-dev-middleware)用的是`Express` + `webpack-dev-middleware`,那我也跟着官方推荐的用。

其实说到底，也就是node在本地开启一个服务。将webpack打包出来的文件放到这个服务上面就ok了。

```javascript
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

官方文档是这样子的，我们只需要再它的基础上修改一下。比如说：编译完成打开浏览器，**http代理**（http-proxy-middleware）**热更新**（webpack-hot-middleware）自己手动添加。

在这里记录自己在开发时遇到的一个问题：页面route使用`history`模式，当切换路由刷新页面的时候。会出现显示`Cannot GET /login`的空白页面。这个就涉及到了前端的路由机制。目前浏览器提供了两种路由方式：

1、hash 模式：在地址栏上会有一个#符号。他的特点在于hash虽然出现在url中，但是它并不在HTTP请求中，对后端没有影响。因此改变hash不会重新加载页面。

2、history模式：利用了HTML5 history interface中新增的pushState和replaceState方法。这两个方法应用于浏览器的历史记录栈。在当前已有的back、forward、go的基础之上，提供了对历史记录进行修改的功能。只是当他们修改的时候虽然改变了当前的URL，但是浏览器不会立即向后端发送请求。

我们可以尝试当我们访问根路由的时候，刷新是没有问题的，但是当我们切换到其他页面的时候，刷新就会出错就会请求不到资源。这个就是因为使用history模式，导致你刷新的时候，这些资源在服务端找不到。解决方案：[connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback)在文档中也有说明。

## 基础库分离，静态资源分离

拿react来说，我的项目中首先要用到两个lib，`React`、`React-dom`这两个资源对于我们来说是不会修改的，所以当我们把这两个lib打入到main.js中的时候会出现几个问题：

1、增加这个包的体积，当我们第一次访问的时候会影响渲染的速度。

2、当文件发生变化的时候，缓存失效。但是对于React和React-dom这两个lib并没有发生变化。

我们可以将分出来的包发布到cdn，这样，我们的主包的体积会轻量很多。

至于分包的技术，主要是利用webpack内置的splitChunks,实例如下：

```javascript
optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 10000,
            cacheGroups: {
                materialVendors: {
                    test: /[/\\]node_modules[/\\]@material-ui/,
                    priority: 10,
                    name: 'materialui~vendors'
                },
                react: {
                    test: /[/\\]node_modules[/\\]react/,
                    priority: 10,
                    name: 'React-lib'
                }
            },
         }
}
```

## 代码优化和代码分割

> 代码分割的意义：对于大的web应用来说，将所有的代码都放到一个文件显然是不够的，特别是当你的某些代码块是在某些特殊的环境才会用到。

代码分割在webpack4.0中常用的就是splitchunks。

动态import意思是指，在我们不需要的时候不用引入，只有在需要的时候才会将资源引入。简单举🌰

我们可以通过if-else来动态的import某个模块。因为现在目前还没有原生支持，所以需要用到babel来做一下语法转化，具体用到的插件是:[@babel/plugin-syntax-dynamic-import](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import)

在react项目中，我们用到了react-loadable，对路由进行懒加载。

这样做的好处是：我们减小了main包的体积，提高了首页加载速度。同时，对各个路由页面的缓存也有很大的帮助。我们可以想象，将各个路由的分离，这样我们修改一个页面的时候，不会影响其他页面的缓存。这样就节省了很多资源。

## Babel

> Babel可以将Javascript中的ES5、6、7。。。转化为es5，让低端运行环境能够识别并且执行。而且它也可以对一些语法进行转化。

**关于Babel的使用方法主要有**

1、babel-cli。用于命令行转码，多见于package.json中的scripts中的命令。

2、构建工具插件（webpack的babel-loader）

```jivascript
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
            }
         ]
      }
 }

```

**运行方式和插件**

Babel总共分三个阶段：解析，转换，生成。

Babel本身不具有任何转化功能，他把转化的功能都分解到一个个的plugin中。因为，当我们不配置plugin的时候，经过babel的代码和输入的代码是一样的。

所以这里会延伸出来一个问题：比如es2015是一套规范，包含一二十个转译插件。如果一个一个的安装，配置文件会很长，install的速度也会很长。

为了解决这个问题，babel提供了一组插件的集合：**Preset**，官方内容，目前包括env，react，flow，minify等。

其中**env**是最常用也最重要。env的核心目的就是通过配置得知目标环境的特点，然后只做必要的转化。例如目标浏览器支持 es2015，那么 es2015 这个 preset 其实是不需要的，于是代码就可以小一点(一般转化后的代码总是更长)，构建时间也可以缩短一些。

如果不写任何配置项，env 等价于 latest，也等价于 es2015 + es2016 + es2017 三个相加。

```javascript
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
```

[参考资料](https://zhuanlan.zhihu.com/p/43249121)

## 关于script

这里所说的script是为package.json中的script。逐行分析一下我们用到的命令有哪些：

```javascript
cross-env-shell NODE_ENV=development ts-node --files -P ./scripts/tsconfig.json ./scripts/start.ts --open --env=dev
```

**cross-env-shell:** 看到这个，我们首先想到的就是cross-env。cross-env是跨平台设置和使用环境变量的脚本。举个🌰：

在大多数Windows命令行中在使用NODE_ENV = production设置环境变量时会报错。同样，Windows和Linux命令如何设置环境变量也有所不同。 使用`cross-env`可以设置在不同的平台上有相同的NODE_ENV参数。

那么cross-env-shell和corss-env有什么区别呢？可以看一下[官方文档](https://github.com/kentcdodds/cross-env/#cross-env-vs-cross-env-shell)，所以这个`cross-env-shell NODE_ENV=development`这句话，我们可以理解为不管在什么操作系统上，我们都设置NODE_ENV这个变量为development。

**ts-node：**首先说说为什么会有这么一个玩意儿。我们知道node是不能直接运行ts代码的，而在实际中我们通常是将ts代码编译成js代码，这样无疑会很麻烦，所以就有了ts-node。

ts-node包装了node，它可以直接运行ts代码。使用起来会很方便。为了提高执行速度，默认不会读取 `tsconfig.json` 中的 `files`, `include` 和 `exclude` 字段，而是基于模块依赖读取的。这会导致我们后面写的一些全局的 `.d.ts` 文件不会被读取，为此，我们需要指定 `--files` 参数，详情可以查看 [help-my-types-are-missing](https://github.com/TypeStrong/ts-node#help-my-types-are-missing)


