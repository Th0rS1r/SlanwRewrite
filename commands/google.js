const GoogleSearch = require("google-searcher");

exports.run = async (client, msg, args) => {

    const query = args.join(" ").substring(0, 128);
        
        new GoogleSearch()
        .lang("pt")
        .host("www.google.com.br")
        .query(query)
        .exec()
            .then(results => {
                let r = results[0];
                if(r) {
                    msg.reply(r);
                } else {
                    msg.reply("Nada encontrado!")
                }
            })
            .catch(err => {
                throw err;
            });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    user_must_be_owner: false,
    bot_permissions: [],
    user_permissions: [],
    aliases: ['g']
  };
  
  exports.help = {
    name: 'google',
    description: "Faz uma pesquisa no google",
    example: "google 4shared",
    usage: 'google <pesquisa>'
  };