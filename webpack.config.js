// const path = require("path");
// const nodeExternals = require("webpack-node-externals");
// // const BundleAnalyzerPlugin =
// //   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// module.exports = {
//   mode: "production",
//   target: "node",
//   entry: path.resolve(__dirname, "src", "lib", "index.tsx"),
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "index.js",
//     libraryTarget: "commonjs2",
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         exclude: /node_modules/,
//         use: [
//           {
//             loader: "ts-loader",
//             options: {
//               configFile: "tsconfig.build.json",
//             },
//           },
//         ],
//       },
//     ],
//   },
//   resolve: {
//     extensions: [".tsx", ".ts", ".js"],
//     fallback: {
//         // "zlib": require.resolve("browserify-zlib")
//         "zlib": false
//       }
//   },
//   externals: [nodeExternals()],
// };

// const path = require("path");
// const CopyPlugin = require("copy-webpack-plugin");
// module.exports = {
//     mode: "production",
//     entry: "./src/index.js",
//     performance: {
//         hints: false
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 exclude: /node_modules/,
//                 use: {
//                   loader: 'babel-loader',
//                 },
//               },
//         ]
//     },
    
//     resolve: {
//         extensions: [".js"]
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle.js',
//         publicPath: '/',
//     },
//     plugins: [
//         new CopyPlugin({
//             patterns: [
//                 { from: "src/index.html", to: "" },
//                 { from: "node_modules/scichart/_wasm/scichart2d.data", to: "" },
//                 { from: "node_modules/scichart/_wasm/scichart2d.wasm", to: "" }
//             ]
//         })
//     ]
// };


// const path = require("path");
// const CopyPlugin = require("copy-webpack-plugin");
// const webpack = require("webpack");

// module.exports = {
//   mode: "production",
//   entry: "./src/index.js",
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//         },
//       },
//     ],
//   },
//   resolve: {
//     extensions: [".js", ".jsx"],
//   },
//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "build"),
//   },
//   plugins: [
//     new CopyPlugin({
//       patterns: [
//         { from: "src/index.html", to: "" },
//         { from: "node_modules/scichart/_wasm/scichart2d.data", to: "" },
//         { from: "node_modules/scichart/_wasm/scichart2d.wasm", to: "" },
//         { from: "node_modules/scichart/_wasm/scichart3d.data", to: "" },
//         { from: "node_modules/scichart/_wasm/scichart3d.wasm", to: "" },
//       ],
//     }),
//   ],
//   devServer: {
//     client: {
//       overlay: {
//         warnings: false,
//         errors: true,
//       },
//     },
//   },
// };