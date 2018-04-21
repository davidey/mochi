var fs = require('fs');

var env = process.env.MOCHI_ENV || 'dev';
var sourceFile = __dirname + '/app/_env.' + env + '.js';
var destFile = __dirname + '/app/env.js';

console.log('Using file ' + sourceFile);

fs.unlinkSync(destFile);
fs.symlinkSync(sourceFile, destFile);
