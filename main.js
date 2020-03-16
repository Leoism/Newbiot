const Discord = require("discord.js");
const client = new Discord.Client();
const keys = require("./keys.js");
const magic8 = require("./functions/magic8.js");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  let regex = /[!#.\/](?:magic8|8|ask)/;
  console.log(JSON.stringify(msg, null, 2));
  if (msg.content.match(regex)) {
    msg.channel.send(magic8.ask());
  }
});

client.login(keys.token);