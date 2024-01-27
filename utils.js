const fs = require("node:fs");
const axios = require("axios");

const saveFile = async (data, key, filename) => {
  const jsonString = JSON.stringify({ data: { [key]: data } });

  try {
    fs.writeFileSync(filename, jsonString);
    console.log(`${filename} file written successfully!`);
  } catch (err) {
    console.error(err);
  }
};

const getPage = async config => {
  try {
    const response = await axios(config);
    const { meta } = response.data;

    return { response, meta };
  } catch (error) {
    console.error({ error });
  }
};

const generateConfig = (url, page) => {
  return {
    url: url,
    params: {
      per_page: 100,
      page: page,
    },
    method: "get",
  };
};

module.exports = { saveFile, getPage, generateConfig };
