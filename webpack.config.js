const path = require("path");
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    entry: path.resolve(appDirectory, "src/main3d.ts"), //path to the main .ts file
    output: {
        path:__dirname + '/www/scripts/',
        filename: 'main3d.js' //name for the javascript file that is created/compiled in memory
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    module: {
      rules: [
        {
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/
        },
      ],
    },
  };