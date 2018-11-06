exports.run = (client, msg, args) => {

  let command;
  if (client.commands.has(args[0])) {
    command = args[0];
  } else if (client.aliases.has(args[0])) {
    command = client.aliases.get(args[0]);
  }
  if (!command) {
    return msg.channel.send(`I cannot find the command: ${args[0]}`);
  } else {
    msg.channel.send(`Reloading: ${command}`)
      .then(m => {
        client.reload(command)
          .then(() => {
            m.edit(`Successfully reloaded: ${command}`);
          })
          .catch(e => {
            m.edit(`Command reload failed: ${command}\n\`\`\`${e.stack}\`\`\``);
          });
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  bot_permissions: [],
  user_permissions: [],
  user_must_be_owner: true
};

exports.help = {
  name: 'reload',
  description: 'Reloads the command file, if it\'s been updated or modified.',
  example: "reload avatar",
  usage: 'reload <commandname>'
};
