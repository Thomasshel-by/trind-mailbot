# Setup

const Discord = require('discord.js');
const config = require("./config.json")
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
  color: "#00ffff",
  idGuild: "999657684481617971",
  idCategory: "999657685551173703",
  roleStaff: "999657684506779656",
  wEmoji: "❌",
  rEmoji: "✅",
  cTitle: "Seu ticket foi fechado!",
  cMessage: "Seu ticket foi finalizado por um atendente!",
  staffOTitle: "Um usuário abriu um ticket",
  userOTitle: "Ticket criado.",
  userOMessage: "Aguarde, em breve um dos nossos atendentes o responderá."
})
});