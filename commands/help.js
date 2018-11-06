const Discord = require("discord.js");

exports.run = (client, msg, params) => {
  if (!params[0]) {
    let str = "";

        client.commands.forEach(command => {
            str += `\`${command.help.name}\` `;
        });

        const embed = new Discord.RichEmbed();
        embed.setTitle(`[Use ${process.env.prefix}help <commandname> for details] `);
        embed.setColor(0x36393F);
        embed.setDescription(str);
        msg.channel.send({ embed });
   
     
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      msg.channel.send(`= ${command.help.name} = \n\n${command.help.description}\n\nUsage :: ${command.help.usage}\n\nAliases :: ${command.conf.aliases}\n\nExemplos :: ${command.help.example}`, {code:'asciidoc'});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  user_must_be_owner: false,
  bot_permissions: [],
  user_permissions: [],
  aliases: ['h', 'halp']
};

exports.help = {
  name: 'help',
  description: 'Mostra todos os comando disponíveis',
  example: 'help avatar',
  usage: 'help [command]'
};
