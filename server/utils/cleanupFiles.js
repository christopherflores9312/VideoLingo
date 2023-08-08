const fs = require('fs');

function cleanupFiles(filePaths) {
  return Promise.all(filePaths.map(filePath => {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
            reject(err);
          } else {
            console.log('File deleted successfully:', filePath);
            resolve();
          }
        });
      } else {
        console.log(`File not found: ${filePath}`);
        resolve();  // Resolve the promise if the file is not found
      }
    });
  }));
}

module.exports = cleanupFiles;
