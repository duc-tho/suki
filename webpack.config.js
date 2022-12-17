const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = () => {
    return {
        entry: './src/client/index.tsx',
        output: {
            path: path.join(__dirname, 'build', 'dist'),
            filename: 'bundle.js',
            publicPath: '/'
        },
        mode: process.env.NODE_ENV || 'development',
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: ['ts-loader']
                },
                {
                    test: /\.(css)$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' }
                    ]
                },
                {
                    test: /\.(jpg|jpeg|png|gif|mp3|svg|woff|woff2|eot|ttf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                esModule: false
                            }
                        }
                    ]
                }
            ]
        },
        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(),
                ...(process.env.NODE_ENV === 'production' ? [new UglifyJsPlugin()] : [])
            ]
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/client/template/index.html'
            }),
            new Dotenv({
                path: './.env'
            })
        ]
    };
};
