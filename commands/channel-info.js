const Discord = require("discord.js");
const types = {
	dm: 'DM',
	group: 'Group DM',
	text: 'Text Channel',
	voice: 'Voice Channel',
	category: 'Category',
	unknown: 'Unknown'
};
exports.run = async (client, msg, args) => {

    let ch = msg.channel;

        let firstMention = msg.mentions.channels.first() || msg.guild.channels.get(args[0]);
        if(firstMention) ch = firstMention;

        const embed = new Discord.RichEmbed();
         embed.setTitle("= CHANNEL INFORMATION =")
         embed.addField(`• Name`, `${ch.type === 'dm' ? `@${ch.recipient.username}` : ch.name}`, true) 
         embed.addField(`• Id`, `${ch.id}`, true)
         embed.addField(`• NSFW`, `${ch.nsfw ? 'Yes' : 'No'}`, true)
         embed.addField(`• Category`, `${ch.parent ? ch.parent.name : 'None'}`, true)
         embed.addField(`• Type`, `${types[ch.type]}`, true)
         embed.addField(`• Created At`, `${ch.createdAt.toDateString()}`, true)
         embed.addField(`• Topic`, `${ch.topic || 'None'}`, true)
      
      msg.channel.send({ embed });
}
    exports.conf = {
        enabled: true,
        guildOnly: false,
        user_must_be_owner: false,
        bot_permissions: [],
        user_permissions: ["EMBED_LINKS"],
        aliases: ['channel']
      };
      
      exports.help = {
        name: 'channel-info',
		description: 'Mostra as informações de um canal',
		example: "channel-info #general",
        usage: "channel-info #channel" 
      };
    