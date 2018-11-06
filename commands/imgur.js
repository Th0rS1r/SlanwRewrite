const Discord = require("discord.js");
const snekfetch = require('snekfetch');
const { IMGUR_KEY } = process.env;

exports.run = async (client, msg, args) => {

    let search = args.join(" ");
      
        try {
			const { body } = await snekfetch
				.get('https://api.imgur.com/3/gallery/search')
				.query({ q: search })
				.set({ Authorization: `Client-ID ${IMGUR_KEY}` });
			//const images = body.data.filter(image => image.images && (msg.channel.nsfw ? true : !image.nsfw));
			if (!body.length) return msg.channel.send(`Não encontrei nenhum resultado para \` ${search}\`.`);
			return msg.channel.send(body[Math.floor(Math.random() * body.length)].images[0].link);
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
    name: 'imgur',
    description: "Procura uma imagem no imgur",
    example: "imgur foca",
    usage: 'imgur <pesquisa>'
  };
