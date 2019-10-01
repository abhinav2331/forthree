var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './public/index.html',
    mode: "production",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        })
    ]
};