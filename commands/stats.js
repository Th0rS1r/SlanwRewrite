const Discord = require("discord.js");
const { version } = require("discord.js");
const moment = require("moment");
const { duration } = require('../includes/Util');
const os = require('os');

exports.run = async (client, msg, args) => {
    let cpu = os.loadavg();
    const embed = new Discord.RichEmbed();
      embed.setDescription(`\`\`\`asciidoc\n= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• CPU Usage  :: ${Math.ceil(cpu[1] * 100) / 10}%
• Uptime     :: ${duration(client.uptime)}
• Users      :: ${client.users.size}
• Servers    :: ${client.guilds.size}
• Channels   :: ${client.channels.size}
• Discord.js :: v${version}
• Node       :: ${process.version}\`\`\``)
      embed.setColor(5198940)                                                                                                                                                                                                           
      embed.addField("Invite Me", `If you want to add me to your guild, you can do so by grabbing my invite code from [here](https://discordapp.com/api/oauth2/authorize?client_id=496104573195517985&permissions=8&scope=bot)`);
      msg.channel.send({ embed });
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
    name: 'stats',
    description: 'Mostra informações mais detalhadas do bot',
    example: "none",
    usage: 'stats'
  };