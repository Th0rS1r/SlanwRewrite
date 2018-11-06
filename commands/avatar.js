const Discord = require("discord.js");

exports.run = async (cliente, msg, args) => {
  
  let user = msg.author;

  let firstMention = msg.mentions.users.first() || msg.guild.members.get(args[0]);
  if(firstMention) user = firstMention;

  let avatar = new Discord.RichEmbed()

  .setTitle("Quick URL") 
  .setURL(user.displayAvatarURL)
  .setAuthor(`${user.tag} Avatar!`)
  .setImage(user.displayAvatarURL);

  msg.channel.send(avatar);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    user_must_be_owner: false,
    bot_permissions: [],
    user_permissions: ["EMBED_LINKS"],
    aliases: ["image"]
  };
  
  exports.help = {
    name: 'avatar',
    description: 'Você pode ver o seu avatar ou de outro membro',
    example: "avatar @ZurgsKel#8140",
    usage: 'avatar @Member'
  };