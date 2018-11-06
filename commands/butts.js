const snekfetch = require("snekfetch");

module.exports.run = async (client, msg, args) => {

    try {
      if (!msg.channel.nsfw) return msg.channel.send({embed: {
        "title": "Error!", 
        "color": 16711680,
        "image": {
            "url": "https://i.imgur.com/sIKdbdu.png"
          },
        "description": "Cannot display NSFW content in a SFW channel."
      }});
        // Depois de ativo, envia uma imagem a cada intervalo de tempo(15min)
          setInterval(async function() {
                 let { body } = await snekfetch.get("http://api.obutts.ru/butts/0/1/random");
     
            msg.channel.send({
                embed: {
                color: 4861695,
                title: "Click here if the image failed to load.",
                url: `http://media.obutts.ru/${body[0].preview}`,
                image: {
                url: `http://media.obutts.ru/${body[0].preview}`
                },
                footer: {
                text: `Model: ${body[0].model} || Rank: ${body[0].rank}`
                }
                }
            });
            
          },900000);

      } catch(ex) {
        console.log(ex);
      }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    user_must_be_owner: true,
    bot_permissions: ["EMBED_LINKS"],
    user_permissions: ["EMBED_LINKS"],
    aliases: []
  };
  
  exports.help = {
    name: 'butts',
    description: 'Envia uma imagem a cada intervalo de tempo',
    example: "none",
    usage: 'butts'
  };
