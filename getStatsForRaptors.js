const { saveFile, readFile, getPage, generateAxiosConfig } = require("./utils");

const getStatsForRaptors = async () => {
  const fileString = await readFile("playerIds.json");
  const fileJSON = JSON.parse(fileString);
  const playerIds = fileJSON.data.player_ids;

  const statsUrl = "https://www.balldontlie.io/api/v1/stats";
  let nextPage = 1;
  const collection = [];
  const additionalParams = {
    seasons: [2023],
    player_ids: [...playerIds],
  };

  while (nextPage) {
    console.log(`getting page: ${nextPage}`);
    const config = generateAxiosConfig(statsUrl, nextPage, additionalParams);

    const { response, meta } = await getPage(config);
    collection.push(...response.data.data);

    console.log(`There are ${collection.length} statistics collected`);
    nextPage = meta.next_page;
  }

  saveFile(collection, "player_statistics", "playerStatistics.json");
};

getStatsForRaptors();
