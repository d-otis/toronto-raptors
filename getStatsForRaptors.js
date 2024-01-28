const { saveFile, getPage, generateAxiosConfig } = require("./utils");

const getStatsForRaptors = async () => {
  const statsUrl = "https://www.balldontlie.io/api/v1/stats";
  let nextPage = 1;
  const collection = [];
  const additionalParams = {
    seasons: [2023],
    player_ids: [
      71, 960, 961, 989, 998, 999, 1016, 1017, 1087, 1088, 1130, 1166, 1167,
      1231, 1303, 1316, 1330, 1349, 1350, 1420, 1421, 1482, 1549, 1550, 1566,
      1626, 1627, 1699, 1700, 1722, 1769, 1815, 1829, 1909, 2020, 2034, 2085,
      279, 287, 121, 311, 666702, 666847, 2190, 17895914, 4196812, 409, 143,
      17895730, 17895731, 666393, 17895992, 17896098, 35, 2158, 3547278,
      3547263, 3547292, 484, 17553988, 56, 17896020, 666762, 206, 58, 3089,
      3547275, 31, 17896055, 489, 436, 18, 56677828, 376, 3547249, 17896064,
      56677869, 38017717, 56677805, 373, 416, 38017710,
    ],
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
