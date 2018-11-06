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
    
        const { body } = await snekfetch.get("https://rra.ram.moe/i/r?type=nsfw-gtn&nsfw=true");
        msg.channel.send({
          embed: {
            "title": "Click here if the image failed to load.",
            "url": `https://cdn.ram.moe/${body.path.replace("/i/", "")}`,
            "color": 5198940,
            "image": {
              "url": `https://cdn.ram.moe/${body.path.replace("/i/", "")}`
            }
          }
        });
      } catch (e) {
        console.log(e);
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
    name: 'gtn',
    description: "Mostra um comic random de GreenTeaNek",
    example: "none",
    usage: 'gtn'
  };

