const envPreset = [
    '@babel/preset-env',
    {
        // 只导入需要的 polyfill
        useBuiltIns: 'usage',
        // 指定 corjs 版本
        corejs: 3,
        // 禁用模块化方案转换
        modules: false,
    },
];

module.exports = function(api) {
    return {
            "presets": [

                "@babel/preset-typescript",
                "@babel/preset-react",
                envPreset
            ],
            "plugins": ["@babel/plugin-syntax-dynamic-import"]
    }
}