const axios = require("axios");
const fs = require("node:fs");

const getPlayerIds = async () => {
  let nextPage = 1;
  const allRaptorsPlayers = [];

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
      `getting page: ${nextPage}`,
      `${allRaptorsPlayers.length} have been saved`
    );

    await getPage(nextPage);
  }

  const playerIds = allRaptorsPlayers.map(player => player.id);

  try {
    fs.writeFileSync("players.json", JSON.stringify(allRaptorsPlayers));
    console.log("file written successfully!");
  } catch (err) {
    console.error(err);
  }

  console.log({ playerIds });
};

getPlayerIds();
