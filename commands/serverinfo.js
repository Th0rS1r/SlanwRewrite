let Discord = require("discord.js");

exports.run = async (client, msg, args) => {

  let member = msg.guild.members.filter(men => !men.user.bot).size;
       //let canai = client.channels.filter(ca => !types[msg.channel.type]).size;
       let online = msg.guild.members.filter(m => m.presence.status != "offline").size;
       //console.log(canai)

        const embed = new Discord.RichEmbed();
      embed.setTitle(`= SERVER INFORMATION =`)
      embed.addField(`• Name`, `${msg.guild.name}`)
      embed.addField(`• Owner`,`${msg.guild.owner.user.tag}`)
      embed.addField(`• Members`, `${msg.guild.memberCount}`)
      embed.addField(`• Members no BOT`, `${member}`)
      embed.addField(`• Region`, `${msg.guild.region}`)
      embed.addField(`• Channels`, `${client.channels.size}`)
      embed.addField(`• Members Online`, `${online + '/' + msg.guild.members.size + ' online'}`)
      embed.addField(`• Created At`, `${msg.guild.createdAt.toDateString()}`)
      embed.setThumbnail(msg.guild.iconURL, true)
      msg.channel.send({ embed });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  bot_permissions: [],
  user_permissions: ["EMBED_LINKS"],
  user_must_be_owner: false
};

exports.help = {
  name: 'serverinfo',
  description: 'Mostra as informacoes do servidor',
  example: "none",
  usage: 'serverinfo'
};
