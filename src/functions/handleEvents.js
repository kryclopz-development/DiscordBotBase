require('colors')

module.exports = (client) => {
    client.handleEvents = async (eventFiles, path) => {
        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
                console.log('[ EVENTS ]'.bold.yellow + ' Loaded Event:'.bold + ` ${event.label.toUpperCase()}`.bold.yellow);
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
                console.log('[ EVENTS ]'.bold.yellow + ' Loaded Event:'.bold + ` ${event.label.toUpperCase()}`.bold.yellow);
            }
        }
        console.log(" ")
    };
}
