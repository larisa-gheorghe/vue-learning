const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js%/,   //checking if the file ends in .js extension
                exclude: /(node_modules)/,   //prevent the processing of files in the node_modules directory
                use: 'babel-loader'
            },
            {
                test:/\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],
    watch: true
}