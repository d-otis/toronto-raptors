const { saveFile, getPage, generateAxiosConfig } = require("./utils");

const getPlayerData = async () => {
  const playersUrl = "https://www.balldontlie.io/api/v1/players";
  let nextPage = 1;
  const allRaptorsPlayers = [];

  while (nextPage) {
    console.log(`getting page: ${nextPage}`);

    const { response, meta } = await getPage(
      generateAxiosConfig(playersUrl, nextPage)
    );
    const players = response.data.data;
    const raptorPlayers = players.filter(player => player.team.id == 28);

    raptorPlayers.length && allRaptorsPlayers.push(...raptorPlayers);

    console.log(
      ` ${allRaptorsPlayers.length} players have been collected in the array`
    );

    nextPage = meta.next_page;
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
      key: "players_ids",
      filename: "playerIds.json",
    },
  ];

  for (const file of filesConfig) {
    const { collection, key, filename } = file;
    saveFile(collection, key, filename);
  }
};

getPlayerData();
