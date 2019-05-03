exports.run = (client, msg, args) => {
  async function purge() 
        {
            msg.delete();

                if(isNaN(args[0])) 
                {
                   return msg.channel.send("Não use letras, use apenas numeros como seus argumentos \n Usage: +prune <1-1000>");
                } else if(args[0] > 1000)
                {
                    return msg.channel.send("O número é maior do que mil(1000)\nUsage: +prune <1-1000>");
                }

            const fetched = await  msg.channel.fetchMessages({limit: args[0]});
            console.log(fetched.size + " messages found, deleting...");

            msg.channel.bulkDelete(fetched);
             //.catch(error => msg.channel.send(`Error: ${error}`));
        }

        purge();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  user_must_be_owner: false,
  bot_permissions: [],
  user_permissions: ["MANAGE_MESSAGES"],
  aliases: ["purge"]
};

exports.help = {
  name: 'prune',
  description: 'Purges X amount of messages from a given channel.',
  example: "prune 67",
  usage: 'prune <1-100>'
};
