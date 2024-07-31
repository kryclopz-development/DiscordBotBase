const { ActivityType } = require("discord.js");
require("colors");

module.exports = {
	name: "ready",
	label: "status",
	once: true,
	async execute(client) {
		const status = await client.user.setPresence({
			status: "dnd", // 'dnd', 'idle', 'invisible', 'online'
			activities: [
				{
					type: ActivityType.Custom, // ActivityType.????
					name: "customStatus", // Not Important for Custom ActivityType
					state: `⚙️ Wow! A Custom Status!!`, // This is only used for Custom ActivityType
				},
			],
		});

    if (status) {
      console.log("[ CLIENT ]".bold.cyan + " Activated Status".bold);
			console.log(" ");
    } else {
      return
    }
	},
};
