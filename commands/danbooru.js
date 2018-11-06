const Discord = require("discord.js");
const snekfetch = require("snekfetch");

exports.run = async (client, message, args) => {

  let search = args.join("_");
      
  try {
      if (!msg.channel.nsfw) return msg.channel.send({embed: {
          "title": "Error!", 
          "color": 16711680,
          "image": {
              "url": "https://i.imgur.com/sIKdbdu.png"
            },
          "description": "Cannot display NSFW content in a SFW channel."
        }});
  
  
      const { body } = await snekfetch
  .get('https://danbooru.donmai.us/posts.json')
  .query({
    tags: `${search} order:random`,
    limit: 1
  });
    if (!body.length || !body[0].file_url) return msg.channel.send(`Não encontrei nenhum resultado para  \` ${search}\`.\n`);
      msg.channel.send({
        embed: {
          "title": "Click here if the image failed to load.",
          "url": body[0].file_url,
          "image": {
            "url": body[0].file_url
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
}

  exports.conf = {
    enabled: true,
    guildOnly: false,
    user_must_be_owner: false,
    bot_permissions: [],
    user_permissions: ["EMBED_LINKS"],
    aliases: ["danbootu-image"]
  };
  
  exports.help = {
    name: 'danbooru',
    description: 'Mostra uma imagem aleatória ou apartir de uma tag.',
    example: "danbooru || danbooru touhou",
    usage: 'danbooru <tag(opcional)> '
  };