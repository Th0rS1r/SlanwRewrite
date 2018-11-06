const Discord = require("discord.js");
const { randomFromImgurAlbum } = require('../includes/Util');

exports.run = async (client, msg, args) => {

    let user = msg.mentions.users.first() || msg.guild.members.get(args[0]);
      
    try {
        const gif = await randomFromImgurAlbum('mZrp8');
        return msg.channel.send(`_**${msg.author.username}** punches **${user.username}**._`, { files: [gif] });
    } catch (err) {
        return msg.reply(`Oh no, ocorreu um erro: \`${err.message}\`. Tente novamente depois!`);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    user_must_be_owner: false,
    bot_permissions: [],
    user_permissions: ["EMBED_LINKS"],
    aliases: []
  };
  
  exports.help = {
    name: 'punch',
    description: "'Bate' em outro membro",
    example: "punch @ZurksKel#8140",
    usage: 'punch <member>'
  };