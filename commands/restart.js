exports.run = (client, msg, args) => {
  
    msg.channel.send("Restarting...").then(m => {
        m.delete().then(() => {
          client.destroy().then(() => {
            process.exit(1)
          })
        })
    })
    
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    bot_permissions: ["SEND_MESSAGES"],
    user_permissions: [],
    user_must_be_owner: true
  };
  
  exports.help = {
    name: 'restart',
    description: 'Restart the bot',
    example: "none",
    usage: 'restart'
  };
  