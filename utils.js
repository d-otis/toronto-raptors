const fs = require("node:fs");

const saveFile = async (data, key, filename) => {
  const jsonString = JSON.stringify({ data: { [key]: data } });

  try {
    fs.writeFileSync(filename, jsonString);
    console.log(`${filename} file written successfully!`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { saveFile };
