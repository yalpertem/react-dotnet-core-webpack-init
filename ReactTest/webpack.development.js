const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const ExtractCssPlugin = require('mini-css-extract-plugin');

const webpackDevServerPort = 8083;
const proxyTarget = "http://localhost:5000";

module.exports = merge(common, {
    entry: { main: './wwwroot/js/commentBox.jsx' },
    output: {
        path: path.resolve(__dirname, './wwwroot/js/dist'),
        filename: "test.js",
        publicPath: '/dist/'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        proxy: {
            '*': {
                target: proxyTarget
            }
        },
        port: webpackDevServerPort
    },
    plugins: [
        new ExtractCssPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
});