
exports.run = async (client, msg, args) => {
    let nick = args.join(" ");
    try {
        if (!nick) {
            msg.channel.send("**Please provide a new nickname.**")
            return;
           }
           if (msg.author.id === msg.guild.owner.id) {
            msg.channel.send("**Unfortunately I cannot change the owners nickname.**")
            return;
           }
           if (msg.member.highestRole.position < msg.guild.member(client.user).highestRole.position) {
            msg.member.setNickname(nick);
            msg.channel.send("**Your nickname is now:** " + nick)
           } else {
            msg.channel.send("**Infortunately I cannot change your nickname because your role is higher than mine.**")
           }
    } catch (err) {
        console.log(err);
    }
    
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    user_must_be_owner: false,
    bot_permissions: ["SEND_MESSAGES", "MANAGE_NICKNAMES"],
    user_permissions: [],
    aliases: ["nick"]
  };
  
  exports.help = {
    name: 'nickname',
    description: 'Change *your* nickname using emojis and other special characters',
    example: "nickname Debonho",
    usage: 'nickname <NewNickname>'
  };