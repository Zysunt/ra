const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");

const htmlPlugin=new HtmlWebpackPlugin({
    template: path.join(__dirname,"./src/index.html"),
    filename:"index.html"
})

module.exports={
    'mode':'development',
    plugins:[
        htmlPlugin
    ],
    module: { 
        rules: [ 
          { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ },
          { test: /\.css$/, use: ['style-loader','css-loader']},
          { test: /\.ttf|woff|woff2|eot|svg$/, use: 'url-loader' },
          { test: /\.(jpg|jpeg|gif|png|bmp)$/, use: 'url-loader?limit=162212&name=[hash:8]-[name].[ext]' },
          { test: /\.less$/, use: ['style-loader','css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]','less-loader']}
        ]
      },
    resolve:{
      extensions:['.js','.jsx','.json'],
      alias:{
        '@':path.join(__dirname,"./src")
      }
    }  
}