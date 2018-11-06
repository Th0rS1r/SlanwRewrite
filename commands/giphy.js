const Discord = require("discord.js");
const snekfetch = require('snekfetch');
const { GIPHY_KEY } = process.env;

exports.run = async (client, msg, args) => {

    let search = args.join(" ");
      
        try {
			const { body } = await snekfetch
				.get('http://api.giphy.com/v1/gifs/search')
				.query({
					q: search,
					api_key: GIPHY_KEY,
					rating: msg.channel.nsfw ? 'r' : 'pg'
				});
			if (!body.data.length) return msg.channel.send(`Não encontrei nenhum resultado para \` ${search}\`.`);
			return msg.channel.send(body.data[Math.floor(Math.random() * body.data.length)].images.original.url);
		} catch (err) {
			return msg.reply(`Oh no, ocorreu um erro: \`${err.message}\`. Tente novamente depois!`);
		}
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    user_must_be_owner: false,
    bot_permissions: ['gif', 'giphy-gif'],
    user_permissions: ["EMBED_LINKS"],
    aliases: []
  };
  
  exports.help = {
    name: 'giphy',
    description: "Procura um gif",
    example: "giphy Obama",
    usage: 'giphy <pesquisa>'
  };
