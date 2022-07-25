# Trind Mailbot
  Package mailbot do trindade
# Setup
```
const Discord = require('discord.js');
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  allowedMentions: {
    parse: ["roles", "users", "eveoryone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: allIntents,
});

client.login(config.token);

client.once('ready', async () => {

    console.log("✅ - Fiquei on parceiro!")

})

const trindMail = require("trind-mailbot-package");

client.on("ready", () => {
trindMail.MailBot(client, {
  anonymous: true,
  color: "hex",
  idGuild: "ID",
  idCategory: "ID",
  roleStaff: "ID",
  wEmoji: "❌",
  rEmoji: "✅",
  cTitle: "Seu atendimento foi encerrado!", //Título da mensagem de close
  cMessage: "Seu atendimento foi encerrado por um membro da nossa equipe.", //Mensagem de close
  staffOTitle: "Um usuário solicitou atendimento", //Mensagem da staff
  userOTitle: "Ticket criado.", //Título do usuário
  userOMessage: "Aguarde, em breve um dos nossos atendentes o responderá." //Mensagem do usuário
})
});
```