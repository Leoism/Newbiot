const Discord = require("discord.js");
const client = new Discord.Client();
const keys = require("./keys.js");
const magic8 = require("./functions/magic8.js");
const ud = require("./functions/urbandictionary.js");
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  let regex = /[!#.\/](?:magic8|8|ask)/;
  console.log(JSON.stringify(msg, null, 2));
  if (msg.content.match(regex)) {
    msg.channel.send(magic8.ask());
  }
  regex = /[!#.\/](?:ud|urbandictionary) (.*?)([0-9]+|$)/;
  let regexResult = msg.content.match(regex);
  if (regexResult) {
    let defNum = regexResult[2] || 1;
    let def = await ud.lookUp(regexResult[1], regexResult[2], defNum);
    const embedText = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(regexResult[1])
      .setDescription(def);
    msg.channel.send(embedText);
  }
});

client.login(keys.token);