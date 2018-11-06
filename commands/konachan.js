const Discord = require("discord.js");
const snekfetch = require("snekfetch");

exports.run = async (client, msg, args) => {

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
.get(`http://konachan.com/post.json?limit=100&tags=${encodeURI(`${args[0]}+rating:e`)}`); //

//const page = JSON.parse(body);
  //console.log(body);
const result = body[Math.floor(Math.random() * body.length)];

if (!result) return msg.channel.send(`Não encontrei nenhum resultado para  \` ${args[0]}\`.\n`);

msg.channel.send({
embed: {
  "title": "Click here if the image failed to load.",
  "url": `http://konachan.com/post/show/${result.id}`,
  "description": `Created by ${result.author}`,
  "color": 4861695,
  "image": {
    "url": result.file_url
  },
  "footer": {
    "text": `Score: ${result.score} | Rating: ${result.rating}`
  },
  //"description": `Tags: ${result.tags}`,
  "timestamp": new Date(result.created_at * 1000)
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
    aliases: ["kona", "kc", "konac"]
  };
  
  exports.help = {
    name: 'konachan',
    description: 'Mostra uma imagem random apartir da sua tag',
    example: "konachan Bowsette",
    usage: 'konachan <tag>'
  };