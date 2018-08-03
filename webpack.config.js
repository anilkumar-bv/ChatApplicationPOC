const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
console.log(path.join(__dirname + "/src/index.html"));
console.log(path.join(process.cwd(), "/src/js/index.js"));
// console.log()
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname + "/src/index.html")
});

module.exports = {
    devtool: 'source-map',
    entry:  "./src/js/index.js",
    output: {
        path: __dirname + '/dist',
        filename: "index.bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', "stage-0"]
                    }
                }
            },
            // Image loader
            {
                test: /\.(png|jpg|gif)$/,
                use: 'url-loader?limit=50000&name=img/img-[hash:6].[ext]',
            },
            // Font loaders
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff',
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(scss)$/,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            }
        ]
    },
    plugins: [htmlWebpackPlugin,

    ],
    resolve: {
        extensions: [".js"]
    },
    devServer: {
        port: 3002
    },
    watch: true
};