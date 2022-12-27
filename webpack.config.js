const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = () => {
    return {
        entry: './src/client/index.tsx',
        output: {
            path: path.join(__dirname, 'build', 'dist'),
            filename: '[id].bundle.js',
            publicPath: '/',
            chunkFilename: '[id].[chunkhash].js'
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
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/](!lodash)/,
                        name (module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return `npm.${packageName.replace('@', '')}`;
                        }
                    }
                }
            },
            minimizer: [
                new CssMinimizerPlugin(),
                new CompressionPlugin(),
                new UglifyJsPlugin({
                    uglifyOptions: {
                        output: {
                            comments: false
                        }
                    }
                })
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
