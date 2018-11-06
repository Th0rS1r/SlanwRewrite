const Discord = module.require("discord.js");

exports.run = async (client, msg, args) => {
  const m = await msg.channel.send(`**${msg.member.displayName}-Senpai** estou verificando...`);
    const embed = new Discord.RichEmbed();
        embed.setColor(0x36393F);
        embed.addField(`⏰ Ping : ${m.createdTimestamp - msg.createdTimestamp}ms`, `**Gateway: ${Math.floor(client.ping)}ms**`);
        m.edit({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  user_must_be_owner: false,
  bot_permissions: [],
  user_permissions: [],
  aliases: ['pong']
};

exports.help = {
  name: 'ping',
  description: 'Mostra seu ping.',
  example: 'none',
  usage: 'ping'
};
