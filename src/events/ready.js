require("colors");

module.exports = {
	name: "ready",
	label: "clientReady",
	once: true,
	async execute(client) {

		console.log(
			"[ CLIENT ]".bold.cyan +
				" Logged In As:".bold +
				` ${client.user.username}`.bold.cyan
		);
		// console.log(" ");
	},
};
