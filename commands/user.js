let Discord = require("discord.js");

exports.run = async (client, msg, args) => {
  let tio = msg.member;

  let firstMention = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0]);
  if(firstMention) tio = firstMention;

  let embed = new Discord.RichEmbed()

      embed.setAuthor(tio.user.tag, tio.user.avatarURL)
      embed.setDescription(`Playing  **${tio.presence.game}**`)
      embed.setFooter("© Zero | v0.1.0")
      embed.setThumbnail(tio.displayAvatarURL)
      embed.setTimestamp()
      embed.addField("ID", tio.id,true)
      embed.addField("❯ Status",  tio.presence.status, true)
      embed.addField("❯ Nickname", tio.nickname || 'None', true)
      embed.addField('❯ Bot?', tio.user.bot ? 'Yes' : 'No', true)
      embed.addField("❯ Account Created", tio.user.createdAt.toDateString(), false)
      embed.addField("❯ Join Date", tio.joinedAt.toDateString(), false)
      //embed.addField("❯ Role", tio.roles.highest !== msg.guild.defaultRole.id ? tio.roles.highest.name : 'None', false)
                              //user.highestRole.name
  msg.channel.send(embed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['user'],
  bot_permissions: [],
  user_permissions: ["EMBED_LINKS"],
  user_must_be_owner: false
};

exports.help = {
  name: 'user-info',
  description: 'Voce pode ver suas informacoes ou deoutor membro',
  example: "user-info ZurgsKel#8140",
  usage: 'user-info @member'
};
