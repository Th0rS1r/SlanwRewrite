const Discord = require("discord.js");
const snekfetch = require('snekfetch');
const { shorten } = require('../includes/Util');


exports.run = async (client, msg, args) => {

    let search = args.join("_");
      
    try {
        const { body } = await snekfetch
            .get('https://pt.wikipedia.org/w/api.php')
            .query({
                action: 'query',
                prop: 'extracts|pageimages',
                format: 'json',
                titles: search,
                exintro: '',
                explaintext: '',
                pithumbsize: 150,
                redirects: '',
                formatversion: 2
            });
        const data = body.query.pages[0];
        if (data.missing) return msg.channel.send(`Não encontrei nenhum resultado para \` ${search}\`.`);
        
        return msg.channel.send(`https://pt.wikipedia.org/wiki/${encodeURIComponent(search).replace(/\)/g, '%29')}`);
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
    aliases: ["wiki","w"]
  };
  
  exports.help = {
    name: 'wikipedia',
    description: 'Faz uam pesquisa na wikipedia',
    example: "wikipedia segunda guerra mundial",
    usage: 'wikipedia <pesquisa>'
  };