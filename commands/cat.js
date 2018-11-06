const Discord = require("discord.js");
const snekfetch = require("snekfetch");

exports.run = async (client, msg, args) => {

    try {
        const { body } = await snekfetch.get('http://aws.random.cat/meow');
        return msg.channel.send({embed: {
    "image": {
                "url": body.file
              },
    "footer": {
                "text": `Disponibilizado por random.cat` 
              },
    } });
    } catch (err) {
        return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
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
    name: 'cat',
    description: "Mostra uma imagem ale de um gato",
    example: "none",
    usage: 'cat'
  };