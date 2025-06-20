// https://prettier.io/docs/en/options.html
module.exports = {
    tabWidth: 4,
    semi: true,
    printWidth: 100,
    useTabs: false,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: 'always',
    overrides: [
        {
            files: '*.js',
            options: {
                trailingComma: 'es5',
            },
        },
    ],
};
