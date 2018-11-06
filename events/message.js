const settings = process.env;
const moment = require('moment');
const Discord = require("discord.js");
const fs = require("fs");
module.exports = msg => {

  const client = msg.client;
  //if (msg.channel.type === "dm") return;
  if(msg.system || msg.author.bot) return;
  if (!msg.content.startsWith(settings.prefix)) return;

  
  /*if (message.content.startsWith(settings.prefix)) {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]` + " GUILD = [" + message.guild.name  +"]; CHANNEL = [" + message.channel.name + "]; COMMAND = [" + message.content + "]; AUTHOR = ["+ message.author.username +"];");
  }*/

  const command = msg.content.split(' ')[0].slice(settings.prefix.length);
  const params = msg.content.split(' ').slice(1);
  
  let cmd;

  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  } else if(!client.commands.has(command)) return;
  
        const errorEmbed = new Discord.RichEmbed();
        errorEmbed.setColor(0x36393F);
 
        /* Verificar permissões */
        if(cmd.conf.user_must_be_owner && settings.OWNERS === msg.author.id) {
            /* Usuário não é dono do bot */
            errorEmbed.setDescription(`
            Você não tem as permissões necessárias para executar esse comando. O comando é restrito. Desculpe!`);
            return msg.reply({ embed: errorEmbed });

        } else if(cmd.conf.guildOnly && !msg.guild) {
            /* Não está em uma guild */
            errorEmbed.setDescription(`
            O comando foi feito para ser executado específicamente em um servidor. Desculpe!`);
            return msg.reply({ embed: errorEmbed });

        } else if(msg.guild && !msg.guild.available) {
            /* Guild não disponível, ignorar */
            return;

        } else if(msg.guild && !msg.member.hasPermission(cmd.conf.user_permissions)) {
            /* Usuário não tem as permissões necessárias */
            const missingPermissions = cmd.conf.user_permissions.filter(perm => !msg.member.hasPermission(perm));

            errorEmbed.setDescription(`
            Você não tem todas as permissões (${missingPermissions.join(", ")}) necessárias para executar o comando.`);
            return msg.reply({ embed: errorEmbed });

        } else if(msg.guild && !msg.guild.me.hasPermission(cmd.conf.bot_permissions)) {
            /* Bot não tem as permissões necessárias */
            const missingPermissions = cmd.conf.bot_permissions.filter(perm => !msg.guild.me.hasPermission(perm));

            errorEmbed.setDescription(`
            Eu não tenho todas as permissões (${missingPermissions.join(", ")}) essenciais para executar o comando.`);
            return msg.reply({ embed: errorEmbed });
        }

  if (cmd) {
    cmd.run(client, msg, params)
  }
};
