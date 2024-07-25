const mongoose = require('mongoose');
const { ActivityType } = require('discord.js')
require('colors');

module.exports = {
  name: 'ready',
  label: 'clientReady',
  once: true,
  async execute(client) {

    const status = await client.user.setPresence({
      status: 'dnd', // 'dnd', 'idle', 'invisible', 'online'
      activities: [
        {
          type: ActivityType.Custom, // ActivityType.????
          name: "customStatus", // Not Important
          state: `⚙️ Wow! A Custom Status!!`
        },
      ]
    })



    console.log('[ CLIENT ]'.bold.cyan + ' Logged In As:'.bold + ` ${client.user.username}`.bold.cyan);
    console.log(" ");

    mongoose.set('strictQuery', true);

    await mongoose.connect(client.config.MongoDB.URI)

    if (mongoose.connect) {
      console.log('[ DATABASE ]'.bold.green + ' MongoDB'.bold + ' Connection Successfully'.bold.green)
      console.log(" ");
    }

    mongoose.connection.on('reconnected', () => {
      console.log('[ DATABASE ]'.bold.green + ' MongoDB'.bold + ' ReConnection Successfully'.bold.blue)
      console.log(" ");
    })

    mongoose.connection.on('error', (error) => {
      console.error('[ DATABASE ]'.bold.green + ' MongoDB'.bold + ' Failed to Connect'.bold.red, error.message);
      console.log(" ");
    });

    mongoose.connection.on('disconnected', (d) => {
      console.log('[ DATABASE ]'.bold.green + ' MongoDB'.bold + ' Disconnected'.bold.red);
      // console.log('[DATABASE]'.green + ' Reason for Disconnecting'.bold + `\n${d}`);
      console.log(" ");
    });
  },
};
