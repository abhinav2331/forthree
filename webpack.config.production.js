"use strict";
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: './src/index.js',
    mode: "production",   
    output: {
        path: path.join(__dirname, 'dist'),        
        filename: "[name].maximpos-prod-entry.js",
        chunkFilename: '[name]-maxim.js',
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
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },  
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        })
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true,
        host: '0.0.0.0',
        port: 8080,
        disableHostCheck: true
    }    
};
