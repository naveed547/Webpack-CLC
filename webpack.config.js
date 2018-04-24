var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackCleanPlugin = require('webpack-clean');
var webpack=require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var recursive = require("recursive-readdir");

module.exports=(env,args)=>{
  var ComponentFilter = require('./plugins/ComponentFilter.js')(env);
  return recursive("./src/", [ComponentFilter.ignoreFunc.bind(ComponentFilter)]).then((files)=>{
     ComponentFilter.files=files;
     return {
       entry: ComponentFilter.getEntryFilesList(),
       output: {
         path: __dirname+'/build/',
         filename: "js/[name].js"
       },
       module: {
         rules: [
         {
            enforce: 'pre',
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'tslint-loader',
            options:{
              emitErrors: true,
              failOnHint: true,
              typeCheck: true
            }
          },
          {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
          },
          {
            test: /\.less$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({use:['css-loader', 'less-loader']})
          },
          {
            test: /.*\.html$/,
            loader:'file-loader',
            options: {
              name: 'html/[name].html'
            }
          },
          {
            test: /.*\.(gif|png|jpe?g)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                  name: 'images/[name].[ext]'
                }
              },
              {
                loader: 'image-webpack-loader',
                options: {
                  name: '[name].[ext]',
                  optipng: {
                    optimizationLevel: 7
                  },
                  pngquant: {
                    quality: '65-90'
                  },
                  mozjpeg: {
                    quality: 65
                  }
                }
              }]
            }]
       },
       plugins: [
          //new webpack.NoEmitOnErrorsPlugin(),
          new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "js/commons.js",
          }),
          new CleanWebpackPlugin(ComponentFilter.getComponentToClean(), {root: __dirname}),
          new ExtractTextPlugin({
            filename:  (getPath) => {
              return getPath('/css/[name].css').replace('less', '');
            },
            allChunks: true
          }),
          ...(ComponentFilter.gethtmlEntryPlugin()),
          new CopyWebpackPlugin([{ from: __dirname+'/src/assests/images/*.png', to: __dirname+'/build/images/',flatten: true}]),
          new WebpackCleanPlugin(ComponentFilter.getCleanFilesList(),path.join(__dirname, 'build/js'))
       ],
       resolve: {
          // Add `.ts` and `.tsx` as a resolvable extension.
          extensions: [".ts", ".tsx", ".js"]
        }
      }
  })
}