var path = require('path');
var ncp = require('ncp').ncp;
var rimraf = require('rimraf');
var fs = require('fs')

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

ncp.limit = 16;

var srcPath = "www";
var destPath = 'docs';

console.log('Removing old build...');
rimraf(destPath, function () {
  console.log('Removed old build');
  fs.mkdirSync(destPath);
  console.log('Copying files...');
  ncp(srcPath, destPath, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('Copying files complete.');
    console.log("Remove Cordova dependencies");

    fs.readFile('docs/index.html', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      const stringToReplace = '<script src="cordova.js"></script>';
      var result = data.replaceAll(stringToReplace, '');
      fs.writeFile(`docs/index.html`, result, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });
  });
});



