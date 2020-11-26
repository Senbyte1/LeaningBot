const Discord = require("discord.js");

module.exports = {
    name: 'ping',
    run: async (client, message, args, print, prefix) => {
        message.channel.send(`Pong! \`${Math.round(client.ws.ping)}ms\``);
    }
}
