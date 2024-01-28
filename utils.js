const { writeFileSync, readFileSync } = require("node:fs");
const axios = require("axios");

const saveFile = async (data, key, filename) => {
  const jsonString = JSON.stringify({ data: { [key]: data } });

  try {
    writeFileSync(filename, jsonString);
    console.log(`${filename} file written successfully!`);
  } catch (err) {
    console.error(err);
  }
};

const readFile = async filename => {
  try {
    const contents = await readFileSync(filename, {
      encoding: "utf-8",
    });
    return contents;
  } catch (error) {
    console.error({ error });
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

const generateAxiosConfig = (url, page, additionalParams = {}) => {
  return {
    url: url,
    params: {
      per_page: 100,
      page: page,
      ...additionalParams,
    },
    method: "get",
  };
};

module.exports = { saveFile, readFile, getPage, generateAxiosConfig };
