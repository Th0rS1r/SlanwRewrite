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
    
    
        const { body } = await snekfetch.get(`https://nekos.life/api${Math.random() >= 0.5 ? "/lewd" : ""}/neko`);
      //console.log(body);
        msg.channel.send({
          embed: {
            "title": "Click here if the image failed to load.",
            "url": body.neko,
            "color": 5198940,
            "image": {
              "url": body.neko
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
    name: 'neko',
    description: 'Mostra uma imagem de uma neko',
    example: "none",
    usage: 'neko'
  };