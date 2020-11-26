const { Client, Collection } = require("discord.js");
var prefix = "f!";

const client = new Client({
    disableEveryone: true,
    autoReconnect: false
});

client.commands = new Collection();
client.aliases = new Collection();

["cmdr"].forEach(handler => {require(`./handlers/${handler}`)(client);});

function print(Text) {console.log(`[Leaning]: ${Text}`)};

client.on("message", async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd);

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (cmd.length === 0) return;
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args, print, prefix);
});

process.on('unhandledRejection', error => {print('An error has occured! ' + error);});
client.on("ready", () => {print(`Started!`); client.user.setActivity("leaning is a furry!",  {type: "STREAMING",url: "https://www.youtube.com/watch?v=80VUdmzJFT8"})});
client.login(process.env.TOKEN);