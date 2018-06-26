import fs from "fs";

function readFileAsync(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

export { readFileAsync };
