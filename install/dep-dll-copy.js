'use strict';
const os = require("os");
const fs = require('fs');
const path = require('path');

const copyFileSync = require('fs-copy-file-sync');
const libvips = require('../lib/libvips');
const npmLog = require('npmlog');

if (process.platform === 'win32') {
  const buildDir = path.join(__dirname, '..', 'build');
  const buildReleaseDir = path.join(buildDir, 'Release');
  npmLog.info('sharp', `Creating ${buildReleaseDir}`);
  try {
    libvips.mkdirSync(buildDir);
    libvips.mkdirSync(buildReleaseDir);
  } catch (err) {}
  const vendorLibDir = path.join(__dirname, '..', 'vendor', 'bin');
  npmLog.info('sharp', `Copying DLLs from ${vendorLibDir} to ${buildReleaseDir}`);
  try {
    fs
      .readdirSync(vendorLibDir)
      .filter(function (filename) {
        return /\.dll$/.test(filename);
      })
      .forEach(function (filename) {
      
        const delimiter = ( (os.platform() === "win32") ?  "\\" : "/")
        console.log(`copy ${vendorLibDir}${delimiter}${filename} ==>  ${buildReleaseDir}${delimiter}${filename}` )
        copyFileSync(
          path.join(vendorLibDir, filename),
          path.join(buildReleaseDir, filename)
        );
      });
  } catch (err) {
    npmLog.error('sharp', err.message);
  }
}
