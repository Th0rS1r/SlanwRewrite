const Discord = require("discord.js");
const { GOOGLE_KEY } = process.env;
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(GOOGLE_KEY);

exports.run = async (client, msg, args) => {
    let search = args.join(" ");
      
    try {
      var videos = await youtube.searchVideos(search, 10);
      let index = 0;
      msg.channel.send(`
__**Seleção de Video:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
**Informe um numero entre** \`1-10\`.
      `);
      // eslint-disable-next-line max-depth
      try {
          var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
              maxMatches: 1,
              time: 10000,
              errors: ['time']
          });
      } catch (err) {
          console.error(err);
          //msg.channel.bulkDelete(2);
          return msg.channel.send('Nada digitado ou número inválido, cancelando a seleção de vídeo.');
      }
      const videoIndex = parseInt(response.first().content);
      var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
  } catch (err) {
      console.error(err);
      return msg.channel.send(`🆘 Não encontrei nenhum resultado para \` ${search}\`.`);
}
  return  msg.channel.send(`https://www.youtube.com/watch?v=${video.id}`);
};



exports.conf = {
    enabled: true,
    guildOnly: false,
    user_must_be_owner: false,
    bot_permissions: [],
    user_permissions: ["EMBED_LINKS"],
    aliases: ["you","y"]
  };
  
  exports.help = {
    name: 'youtube',
    description: 'Faz uam pesquisa no youtube',
    example: "youtube hatsuni miku",
    usage: 'youtube <pesquisa>'
  };
