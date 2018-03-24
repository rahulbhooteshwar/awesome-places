var path = require('path');
var ncp = require('ncp').ncp;
var rimraf = require('rimraf');
ncp.limit = 16;

var srcPath = "platforms/browser/www";
var destPath = 'docs';

console.log('Removing old build...');
rimraf(destPath, function () {
  console.log('Removed old build');
  console.log('Copying files...');
  ncp(srcPath, destPath, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('Copying files complete.');
  });
});

