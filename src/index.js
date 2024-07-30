const { Client, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: 3276799 }); 

client.commands = new Collection();
client.config = require('../config.json')

console.clear()

const handlers = fs
	.readdirSync("./src/handlers")
	.filter((file) => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of handlers) {
			require(`./handlers/${file}`)(client);
		}
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(client.config.Client.Token)
})();

