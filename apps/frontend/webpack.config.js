var path = require('path');

module.exports = {
    entry: './src/public/javascripts/main.js',
    devtool: 'sourcemaps',
    cache: true,
    output: {
        path: __dirname,
        filename: './src/public/javascripts/built/bundle.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
