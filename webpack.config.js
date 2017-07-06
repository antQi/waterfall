var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'js/app.[chunkHash].js'
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            minify: {
                removeComments: true,
                collapseInlineTagWhitespace: true
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader?importLoaders=1'
        }]
    },
    // postcss: function() {
    //     return [
    //         require('autoprefixer')({
    //             broswers: ['last 5 versions']
    //         })
    //     ]
    // }
}