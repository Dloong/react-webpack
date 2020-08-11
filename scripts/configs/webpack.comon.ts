import { Configuration } from 'webpack';

const commonConfig: Configuration = {
    // context: projectRoot,
    entry: './src/index.tsx',
    output: {
        publicPath: '/',
        // path: resolvePath(projectRoot, './dist'),
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
};
export default commonConfig;
