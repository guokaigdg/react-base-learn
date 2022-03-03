module.exports = {
    'presets': [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage', // false 只做了语法转换, entry引入了所有的es扩展包(不用的也会打包进来), usage自动检测代码中用到的功能自动引入模块
                corejs: 3,
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
}