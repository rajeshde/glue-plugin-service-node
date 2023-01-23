const path = require("path");
const glob = require("glob");

const express = require("express");
const router = express.Router();

const replaceSpecialChars = require("./replace-special-chars");

module.exports = async (folderName) => {
  const folderPath = path.join(process.cwd(), folderName);
  const files = glob.sync('**/*.@(js|ts)', {
    cwd: folderPath,
    ignore: [
      '**/node_modules/**', // ignore node_modules directories
      '**/_*/**', // ignore files inside directories that start with _
      '**/_*' // ignore files that start with _
    ]
  });

  for await (const file of files) {
    const { default: handler } = await import(path.join(folderPath, file));
    // File path relative to the project root directory. Used for logging.
    const relativePath = path.relative(".", file)
    if (handler) {
      const filename = folderName === 'actions' ? file.split("/")[0] : file;
      const route = `/${replaceSpecialChars(filename)}`

      try {
        router.post(route, handler);
      } catch (error) {
        console.warn(`Unable to load file ${relativePath} as a Serverless Function`);
        continue;
      }

      console.log(`Loaded route ${route} from ${relativePath}`);
    } else {
      console.warn(`No default export at ${relativePath}`);
    }
  }

  return router;
};
