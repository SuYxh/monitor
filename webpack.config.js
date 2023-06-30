const path = require('path');
//webpack打包项目的 HtmlWebpackPlugin生成产出HTML文件 user-agent 把浏览器的UserAgent变成一个对象
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',//入口文件
    context: process.cwd(),//上下文目录 
    mode: 'development',//开发模式
    output: {
        path: path.resolve(__dirname, 'dist'),//输出目录
        filename: 'monitor.js'//文件名
    },
    devServer: {
        client: {
            overlay: false,
        },
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        // 使用 before 配置路由的示例
        onBeforeSetupMiddleware: function (devServer) {
            devServer.app.get('/success', function (req, res) {
                res.json({ id: 1 });
            });

            devServer.app.post('/error', function (req, res) {
                res.sendStatus(500);
            });
        },
    },
    plugins: [
        new HtmlWebpackPlugin({//自动打包出HTML文件的
            template: './index.html',
            scriptLoading: 'blocking',
            inject: 'head',
        })
    ]

}