
const Discord = module.require("discord.js");

module.exports.run = async (client, msg, args) => {

  let embed = new Discord.RichEmbed()
  embed.setTitle("Minhas Informações!")
  embed.addField("Owner:", process.env.MyOw,true)   
  embed.addField("Servers:",client.guilds.size,true)    
  embed.addField("Real Name:", "Piranha-chan",true)
  embed.addField("Created On", client.user.createdAt.toDateString(),true)
  embed.addField("Avatar: ")
  embed.setImage(client.user.displayAvatarURL);

msg.channel.send(embed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    user_must_be_owner: false,
    bot_permissions: [],
    user_permissions: [],
    aliases: []
  };
  
  exports.help = {
    name: 'botinfo',
    description: 'Mostra algumas Informações do bot',
    example: "none",
    usage: 'botinfo'
  };