### Git 提交规范：

目的是为了保证每次提交内容的可读性，以及团队成员提交代码的一致性。默认的配置文件是在根目录的.commitlintrc.js.

['build', 'ci', 'chore', 'deps', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']

### 项目背景：

在使用 create-react-app 一段时间以后，感触颇深。因为之前一直都是在用 vue。虽然没有手动搭建 webpack 脚手架工具，但是官方提供的确实是不错的。引入了 webpack-chain，在 vue.config.js 中[对内置 webpack 进行调整](https://cli.vuejs.org/guide/webpack.html#simple-configuration)。查看[配置文档](https://cli.vuejs.org/config/)。vue add <plugin-name>命令可以方便的添加非内置插件。官方还提供了详尽的编写插件的[文档](https://cli.vuejs.org/dev-guide/plugin-dev.html)。你可以通过在[Github 搜索以 vue-cli-plugin 开头的工程名](https://github.com/search?o=desc&q=vue-cli-plugin&s=&type=Repositories)来找到插件源码，作为编写插件的参考

但是，前几天尝试使用了 react 之后。在项目基础设施建设的时候，我就被 CRA 给深深的跪服了。CRA 没有提供拓展 webpack 的入口。想要修改 webapck 配置，那么你就需要通过**eject**命令将配置和对应的脚本抽取到工程目录。。。我尝试了 eject,但是我放弃了。太特么多了，看的我眼花缭乱。

经历了这些，我痛定思痛。自己动手，丰衣足食。决定自己手动搭建一套适合自己的脚手架，想配置啥我就配置啥。

### 技术点概要

###### Typescript

已经是 2020 年了，ts 肯定是少不了的。不过最重要的是 ts 搭配 react 才是真的香。所以第一个用到的就是 ts，具体 ts 知识就不说了。

至于为什么要用 ts。关于 ts 的介绍以及有点，google 一大堆。也就不详细说了。

其实也就是在为 javascript 这个弱类型语言来说，添加强类型规范。有了规范，那么久可以避免很多代码中隐藏的 bug。

###### NodeJs

在这里，node 的主要作用是用来作为一个 dev 的 server。

###### Eslint

社区中其实有很多的 lint 工具，例如：Eslint，stylelint， tslint， htmllint 等等。līnt 的作用一方面是可以帮保持团队代码风格统一，另一方面就是检测错误代码，降低 bug 产生的可能性，提高代码质量。

因为打算使用 Ts 来编写 react，所以要选择一款支持 ts 的 lint 工具。最流行的 ts lint 工具有两个。一个是 Tslint 一个是 Eslint。但是在 2019 年 2 月份的时候，tslint 团队宣布废弃 tslint，转而维护将 ts 集成 的 Eslint 工具。具体可以看这个 [issue](https://github.com/palantir/tslint/issues/4534) 和这篇博客：[TSLint in 2019](https://medium.com/palantir/tslint-in-2019-1a144c2317a9)。

项目中，我们使用 lint-staged 和 husky 来做每次 commit 的 lint 校验，用来保证代码的统一。
