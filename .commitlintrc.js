// .commitlintrc.js
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            // 比默认值多了个 deps，用于表示依赖升级，降级，新增等提交
            [
                'build',
                'ci',
                'chore',
                'deps',
                'docs',
                'feat',
                'fix',
                'perf',
                'refactor',
                'revert',
                'style',
                'test',
            ],
        ],
    },
};
