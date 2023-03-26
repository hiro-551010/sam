const path = require('path');
const AwsSamPlugin = require('aws-sam-webpack-plugin');
// import { path } from 'path';
// import { AwsSamPlugin } from 'aws-sam-webpack-plugin';

const awsSamPlugin = new AwsSamPlugin();

module.exports = {
    entry: () => awsSamPlugin.entry(),
    output: {
        filename: (chunkData => awsSamPlugin.filename(chunkData)),
        path: path.resolve('.')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: 'node',
    // 環境がprod以外にできたらここを修正
    mode: 'prod',
    module: {
        rules: [{ test: /\.tsx?$/, loader: 'ts-loader'}]
    },
    plugins: [awsSamPlugin]
}
