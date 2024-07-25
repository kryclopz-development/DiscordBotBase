const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
require('colors')

module.exports = (client) => {
  const clientId = client.config.Client.ID;
  client.handleCommands = async (commandFolders, path) => {
    client.commandArray = [];
    for (folder of commandFolders) {
      const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        client.commandArray.push(command.data.toJSON());
        console.log('[ COMMANDS ]'.bold.blue + ' Loaded Command:'.bold + ` ${command.data.name.toUpperCase()}`.bold.blue);
      }
    }

    const rest = new REST({
      version: '9'
    }).setToken(client.config.Client.Token);

    (async () => {
      try {
        console.log(" ");
        console.log('[ HANDLERS ]'.bold.magenta + ' Started Reloading'.bold + ' (/) Application Commands'.bold.magenta);

        await rest.put(
          Routes.applicationCommands(clientId), {
          body: client.commandArray
        },
        );

        console.log('[ HANDLERS ]'.bold.magenta + ' Successfully Reloaded'.bold + ' (/) Application Commands'.bold.magenta);
        console.log(" ");
      } catch (error) {
        console.error(error);
      }
    })();
  };
};
