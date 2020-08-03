const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets',
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            favicon: './src/assets/img/icon-128x128.png'
        }),
        new HtmlWebpackPlugin({
            template: './src/club-detail.html',
            filename: 'club-detail.html',
            favicon: './src/assets/img/icon-128x128.png'
        }),
        new WebpackPwaManifest({
            name: 'Informasi Sepak Bola',
            short_name: 'Sepak Bola',
            theme_color: '#66bb6a',
            background_color: '#4e9452',
            display: 'fullscreen',
            start_url: './index.html',
            inject: true,
            ios: {
                'apple-mobile-web-app-title': 'Informasi Sepak Bola',
                'apple-mobile-web-app-status-bar-style': 'green',
            },
            icons: [
              {
                src: './src/assets/img/icon-512x512.png',
                sizes: [120, 152, 167, 180, 1024],
                destination: path.join('icons', 'ios'),
                ios: true
              },
              {
                src: './src/assets/img/icon-512x512.png',
                size: 1024,
                destination: path.join('icons', 'ios'),
                ios: 'startup'
              },
              {
                src: './src/assets/img/icon-512x512.png',
                sizes: [36, 48, 72, 96, 144, 192, 512],
                destination: path.join('icons', 'android')
              }
            ]
        }),
        new CopyPlugin({
            patterns: [
                { from: 'service-worker.js', to: 'service-worker.js'}
            ]
        })
    ]
}