const Discord = require("discord.js");
const snekfetch = require('snekfetch');
const { shorten } = require('../includes/Util');

exports.run = async (client, msg, args) => {
    let search = args.join(" ");
      
    try {
        const { body } = await snekfetch
            .get('https://images-api.nasa.gov/search')
            .query({ q: search });
        const filtered = body.collection.items.filter(item => item.data[0].media_type === 'image');
        if (!filtered.length) return msg.channel.send(`Nenhum resultado encontrado para \` ${search}\`.`);
        const data = filtered[Math.floor(Math.random() * filtered.length)];
        return msg.channel.send(shorten(data.data[0].description), { files: [data.links[0].href] });
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
    name: 'nasa',
    description: 'Mostra uma imagem do servidor da nasa',
    example: "nasa Hubble",
    usage: 'nasa <tag>'
  };