const Discord = require("discord.js");
const snekfetch = require("snekfetch");

exports.run = async (client, msg, args) => {
  
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
      .get(`https://rule34.xxx?page=dapi&s=post&q=index&limit=100&tags=${encodeURI(`${search}`)}&json=1`);
     
      const page = JSON.parse(body);
      const result = page[Math.floor(Math.random() * page.length)];
      //console.log(body);

      if (!result) return msg.channel.send(`Não encontrei nenhum resultado para  \` ${search}\`.\n`);
      
       msg.channel.send({
        embed: {
          "title": "Click here if the image failed to load.",
          "url": `https://rule34.xxx/index.php?page=post&s=view&id=${result.id}`,
          "description": `**Tags:** ${result.tags}`,
          //"description": `Created by ${result.owner}`,
          "color": 4861695,
          "image": {
            "url": `https://rule34.xxx/images/${result.directory}/${result.image}`
          },
          "footer": {
            "text": `Score: ${result.score} | Rating: ${result.rating} | Created by: ${result.owner}` 
          },
          "timestamp": new Date(result.created_at * 1000)/* `${result.posted}` */
        }
      });  
  } catch (e) {
    console.log(e);
  }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['r34'],
    bot_permissions: [],
    user_permissions: ["EMBED_LINKS"],
    user_must_be_owner: false
  };
  
  exports.help = {
    name: 'rule34',
    description: 'Mostra uma imagem random apartir da sua tag',
    exampleL: "rule34 Bowsette",
    usage: 'rule34 [tag]'
  };
