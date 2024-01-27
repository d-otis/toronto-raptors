const axios = require("axios");
const { saveFile } = require("./utils");

const getPlayerData = async () => {
  let nextPage = 1;
  const allRaptorsPlayers = [];

  // 1. hitting the API
  // 2. pushing onto a results array
  // 3. repeat (until end of pagination)

  const getPage = async page => {
    const config = {
      url: "https://www.balldontlie.io/api/v1/players",
      params: {
        per_page: 100,
        page: page,
      },
      method: "get",
    };

    try {
      const response = await axios(config);
      const { meta } = response.data;
      const players = response.data.data;
      const raptorPlayers = players.filter(player => player.team.id == 28);

      nextPage = meta.next_page;

      if (raptorPlayers.length) {
        allRaptorsPlayers.push(...raptorPlayers);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  while (nextPage) {
    console.log(
      `getting page: ${nextPage} |`,
      ` ${allRaptorsPlayers.length} players have been collected in the array`
    );

    await getPage(nextPage);
  }

  const playerIds = allRaptorsPlayers.map(player => player.id);

  const filesConfig = [
    {
      collection: allRaptorsPlayers,
      key: "players",
      filename: "players.json",
    },
    {
      collection: playerIds,
      key: "players",
      filename: "playerIds.json",
    },
  ];

  for (const file of filesConfig) {
    const { collection, key, filename } = file;
    saveFile(collection, key, filename);
  }
};

getPlayerData();
