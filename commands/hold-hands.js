const Discord = require("discord.js");
const { randomFromImgurAlbum } = require('../includes/Util');

exports.run = async (client, msg, args) => {

    let user = msg.mentions.users.first() || msg.guild.members.get(args[0]);
      
    try {
        const gif = await randomFromImgurAlbum('K67Lp');
      return msg.channel.send(
       {embed:{  
              "description": `<@${msg.author.id}> holds <@${user.id}>'s hand.`,
              "image": {
                "url": gif
              },
              "footer": {
                "text": `Disponibilizado por imgur.com` 
              },
              }
       });
        //return msg.channel.send(`_**${msg.author.username}** holds **${user.username}**'s hand._`, { files: [gif] });
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
    name: 'holds-hand',
    description: "'Aperta a mão' de outro membro",
    example: "holds-hand @ZurksKel#8140",
    usage: 'holds-hand <member>'
  };