const Discord = require('discord.js')

async function mailbot(client, options = []) {
  let { MessageButton, MessageActionRow } = require('discord.js')


let guild = client.guilds.cache.get(options.idGuild);

if (!guild) throw new Error("Servidor não definido!");



  client.on("messageCreate", async(message) => {

if (message.author.bot) return;
if (message.channel.type === "DM") {
    let mailName = `${message.author.id}`

let usersChannel = await guild.channels.cache.find(ch => ch.name === mailName.toLowerCase());



if (!usersChannel) {

  const createdEmbed = new Discord.MessageEmbed()
  .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
  .setTitle("Nenhum email aberto.")
  .setDescription(message.content)
  .setColor(options.color)



  let categ = guild.channels.cache.get(options.idCategory)



if (!categ) throw new Error("Categoria não definido!")


if (!options.roleStaff) throw new Error("Cargo não definido!")


    let permissions = {
      id: options.roleStaff,
      allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
    }


  guild.channels.create(`${message.author.id}`, {
    type: "text",
    parent: categ,
    permissionOverwrites: [
      {
        id: guild.roles.everyone,
        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] //Deny permissions
      },
     permissions
    ],
  }).then(async (ch) => {


let role = ch.guild.roles.cache.find((r) => r.id == options.roleStaff)


if (!role) throw new Error("Cargo não definido!")


const openedUserEmbed = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
.setTitle(`${options.userOTitle}`)
.setDescription(`${options.userOMessage}`)
.setTimestamp()
.setColor(options.color)
    message.author.send({ embeds: [openedUserEmbed] })


    let usersCreatedChannel = await guild.channels.cache.find(ch => ch.name === mailName.toLowerCase());



let delButton = new MessageButton()
.setStyle("DANGER")
.setLabel('Deletar')
.setCustomId('close_mail')
.setEmoji(`${options.wEmoji}` || '❌')



let deleteRow = new MessageActionRow()
.addComponents([delButton])

const openedStaffEmbed = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
.setTitle(`${options.staffOTitle}`)
.setDescription(`Usuário: ${message.author.tag} (${message.author.id})\n\n **${message.content}**`)
.setTimestamp()
.setColor(options.color)

usersCreatedChannel.send({ embeds: [openedStaffEmbed], components: [deleteRow] })
  })


} else {

    let usersHadChannel = await guild.channels.cache.find(ch => ch.name === mailName.toLowerCase());


const userHadEmbed = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
.setTitle(`${message.content}`)
.setTimestamp()
.setColor(options.color)


usersHadChannel.send({ embeds: [userHadEmbed] })
}

// Sent In DM's //
} else {
  if (message.channel.type === "GUILD_TEXT") {

let categor = guild.channels.cache.get(options.idCategory)


    if (message.channel.parentId !== categor.id) return;

    const usertosend = message.guild.members.cache.find((user) => user.id == message.channel.name)

    if (!usertosend) return;

if (options.anonymous === true) {


    const staffSendEmbedA = new Discord.MessageEmbed()
    .setAuthor(`Atendente`)
    .setDescription(`${message.content}`)
    .setTimestamp()
    .setColor(options.color)

    usertosend.send({ embeds: [staffSendEmbedA] })

} else {
    const staffSendEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
    .setDescription(`${message.content}`)
    .setTimestamp()
    .setColor(options.color)

    usertosend.send({ embeds: [staffSendEmbed] })
}
  }
}
  })



// Channel Deleted //

client.on("channelDelete", (channel) => {

  let category = guild.channels.cache.get(options.idCategory)


if (channel.parentId !== category.id) return;

const user = channel.guild.members.cache.find((user) => user.id == channel.name)

if (!user) return;

const deletedEmbed = new Discord.MessageEmbed()
.setTitle(`${options.cTitle}`)
.setDescription(`${options.cMessage}`)
.setColor(options.color)


user.send({ embeds: [deletedEmbed] })


});





// Delete Buttons //

  let confirmButton = new MessageButton()
.setStyle("SUCCESS")
.setLabel('Confirmar')
.setCustomId('confirm_mail')
.setEmoji(`${options.rEmoji}` || '✔️')


  let cancleButton = new MessageButton()
.setStyle("SECONDARY")
.setLabel('Cancelar')
.setCustomId('cancle_mail')
.setEmoji(`${options.wEmoji}` || '❌')


let optionsRow = new MessageActionRow()
.addComponents([confirmButton])
.addComponents([cancleButton])


client.on('interactionCreate', interaction => {



if (interaction.customId === "close_mail") {
interaction.update({ components: [optionsRow]})

} else {

  if (interaction.customId === "cancle_mail") {

let delButton2 = new MessageButton()
.setStyle("DANGER")
.setLabel('Deletar')
.setCustomId('close_mail')
.setEmoji('❌')



let deleteRow2 = new MessageActionRow()
.addComponents([delButton2])



interaction.update({ components: [deleteRow2]})


  } else {
    if (interaction.customId === "confirm_mail") {
      interaction.message.channel.delete();
    }
  }
} 

  });

}

  module.exports = mailbot;