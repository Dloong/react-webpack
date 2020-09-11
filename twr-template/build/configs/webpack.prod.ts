import { BannerPlugin, HashedModuleIdsPlugin } from 'webpack';
import { merge } from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CompressionPlugin from 'compression-webpack-plugin';
import SizePlugin from 'size-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import commonConfig from './webpack.common';
import { COPYRIGHT, ENABLE_ANALYZE, PROJECT_ROOT, RESOLV_PATH } from '../utils/constants';

const mergedConfig = merge(commonConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          hmr: process.env.NODE_ENV === 'development',
                        },
                    },

                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new BannerPlugin({
            raw: true,
            banner: COPYRIGHT,
        }),
        new CleanWebpackPlugin(),
        new HashedModuleIdsPlugin(),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                // 生产环境打包并不频繁，可以适当调高允许使用的内存，加快类型检查速度
                memoryLimit: 1024 * 2,
                configFile: RESOLV_PATH(PROJECT_ROOT, './tsconfig.json'),
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[id].[contenthash].css',
            ignoreOrder: false,
        }),

        new CompressionPlugin({ cache: true }),

    ],

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
         },
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [new TerserPlugin({ extractComments: false }), new OptimizeCSSAssetsPlugin()],
    },
});

// eslint-disable-next-line import/no-mutable-exports
let prodConfig = mergedConfig;

// 使用 --analyze 参数构建时，会输出各个阶段的耗时和自动打开浏览器访问 bundle 分析页面
if (ENABLE_ANALYZE) {
    prodConfig.plugins!.push(new SizePlugin({ writeFile: false }), new BundleAnalyzerPlugin());
    const smp = new SpeedMeasurePlugin();
    prodConfig = smp.wrap(mergedConfig);
}

export default prodConfig;
