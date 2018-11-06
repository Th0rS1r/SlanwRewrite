const Discord = require("discord.js");
const ms = require("ms");

exports.run = async (client, msg, args) => {
  
  let tomute = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0]);
        
  if (tomute.highestRole.position >= msg.member.highestRole.position) 
      return msg.channel.send({embed:
      {   "title": "= ERRO! =",
          "description" : `Você não pode mutar alguém com o mesmo cargo ou superior ao seu!`}});

  if(tomute.id === msg.author.id)
  {
      return msg.reply({embed:
          {   "title": "= ERRO! =",
              "description" : `Você não pode se mutar!Por quê você tentou?`}});
  } 

  //Verifica se existe a role de mute       "AQUI VOCÊ DEVE MUDAR O NOME DO CARGO"
  let muterole = msg.guild.roles.find(`name`, "Mute");
  
//Cria o cargo caso o servidor não tenha ou não for encontrado 
if (!muterole) { 
try {
muterole = await msg.guild.createRole({
  name: "Mute",
  color: "#000000",
  permissions: []
});
msg.guild.channels.forEach(async (channel, id) => {
  await channel.overwritePermissions(muterole, {
    SEND_MESSAGES: false,
    ADD_REACTIONS: false
  });
});

} catch (e) {
console.log(e.stack);
}   
}
// Fim da criação

// Recebe o valor do tempo de mute
let mutetime = args[1];
if(!mutetime) return msg.reply({embed:
  {   "title": "= ERRO! =",
      "description" : `\nVocê não especificou um tempo!`}});


// Armazena o nome do maior cargo do membro
let rerole = tomute.highestRole.name;
  //console.log(rerole);

// Remove o maior cargo do membro
await (tomute.removeRole(tomute.highestRole.id));


// Adiciona o cargo de mute 
await (tomute.addRole(muterole.id));
msg.channel.send({embed:
  {   "title": "= MUTADO =",
      "description" : `\n <@${tomute.id}> foi mutado por ${ms(ms(mutetime))}`}});
      
// Remove o cargo de mute depois do tempo e devole o maior cargo do membro
setTimeout(function() {
  let adrole = msg.guild.roles.find(`name`, `${rerole}`);
  tomute.addRole(adrole.id)
  tomute.removeRole(muterole.id);
  msg.channel.send({embed:
      {   "title": "= DESMUTADO =",
          "description" : `\n<@${tomute.id}> foi desmutado`}});
}, ms(mutetime));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['tm'],
  bot_permissions: ["ADMINISTRATOR", "MANAGE_GUILD","MANAGE_ROLES_OR_PERMISSIONS"],
  user_permissions: ["ADMINISTRATOR"],
  user_must_be_owner: false
};

exports.help = {
  name: 'tempmute',
  description: 'Muta um membro por um determinado tempo',
  example: "tempmute @ZurgsKel 2m",
  usage: 'tempmute @user <time>'
};
