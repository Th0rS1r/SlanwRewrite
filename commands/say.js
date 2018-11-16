
exports.run = async (cliente, msg, args) => {

    let botmessage = args.join(" ");
      msg.delete().catch();
      msg.channel.send(botmessage);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    user_must_be_owner: false,
    bot_permissions: ["MANAGE_MESSAGES"],
    user_permissions: ["MANAGE_MESSAGES"],
    aliases: ["falar", "talk", "tell"]
  };
  
  exports.help = {
    name: 'say',
    description: 'Bot reply your message',
    example: "say Hello, World!",
    usage: 'say [Text]'
  };
