const path                = require( 'path' );
const fs                  = require( 'fs' );
const webpack             = require( 'webpack' );
const merge               = require( 'webpack-merge' );
const HtmlWebpackPlugin   = require( 'html-webpack-plugin' );
const entryPath           = path.join( __dirname, './app/main.ts' );
const outputPath          = path.join( __dirname, 'dist' );


console.log( 'WEBPACK GO!');

// determine build env
const TARGET_ENV = process.env.npm_lifecycle_event === 'build' ? 'production' : 'development';
const outputFilename = TARGET_ENV === 'production' ? '[name].[hash].js' : '[name].js';
const vendorCSSName = TARGET_ENV === 'production' ? 'vendor.[contenthash].css' : 'vendor.css';

// common webpack config
const commonConfig = {

  output: {
    path:       outputPath,
    filename:   outputFilename,
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.ts' ]
  },

  node: {
    // having issues with fs (check here: https://github.com/josephsavona/valuable/issues/9)
    fs: "empty",

    // so '__dirname' works in dev server
    __dirname: true,
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: "source-map-loader"
      }
    ],
    loaders: [
      {
        test:   /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.DefinePlugin({
      API_ENDPOINT: JSON.stringify('https://bvpoc1.herokuapp.com/api/v1/item/')
    })
  ],

}

// additional webpack settings for local env (when invoked by 'npm start')
if ( TARGET_ENV === 'development' ) {
  console.log( 'Serving locally...');

  module.exports = merge( commonConfig, {

    entry: [
      entryPath
    ],

    devtool: 'source-map',

    // suppress perf hints in browser devtools
    performance: { hints: false },
    

    module: {
      loaders: [
        {
          test:   /\.css$/i,
          loader: 'style-loader!css-loader?sourceMap',
        },
      ]
    }
  });
}

// additional webpack settings for prod env (when invoked via 'npm run build')
if ( TARGET_ENV === 'production' ) {
  console.log( 'Building for prod...');

  module.exports = merge( commonConfig, {

    entry: entryPath,

    module: {
      loaders: [
        {
          test:   /\.css$/i,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader'
          }),    
        },
        {
          test:   /\.(woff|woff2|ttf|eot)$/,
          loader: 'url-loader?limit=50000',
        },
      ]
    },

    plugins: [
      new CleanDistPlugin('dist', {
        root: __dirname
      }),

      new ExtractTextPlugin(vendorCSSName),

      // minify & mangle JS/CSS
      new webpack.optimize.UglifyJsPlugin({
          minimize:   true,
          compressor: { warnings: false }
          // mangle:  true
      }),

      new PurifyCSSPlugin({
        basePath: outputPath,
        paths: ['index.html']
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true }},
      }),
    ],
  });
}
