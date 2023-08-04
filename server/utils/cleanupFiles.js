const fs = require('fs');

function cleanupFiles(filePaths) {
  return Promise.all(filePaths.map(filePath => {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          reject(err);
        } else {
          console.log('File deleted successfully:', filePath);
          resolve();
        }
      });
    });
  }));
}

module.exports = cleanupFiles;
