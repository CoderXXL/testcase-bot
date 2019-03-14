const settings = require('./settings.json')
const discord = require('discord.js')
const bot = new discord.Client({
  disableEveryone: true
})
const prefix = settings.prefix

/* colors */
const green = "\033[1;32m"
const resetColor = "\033[0m"
const black = "\033[0;30m"
const cyan = "\033[0;36m"


/* on bot ready */
bot.on('ready', async () => {

  console.log(`${cyan}Bot is ready ${green + bot.user.username + resetColor}`)

  try {
    let link = await bot.generateInvite(['ADMINISTRATOR'])
    console.log(black + link + resetColor);

  } catch(err) {
    console.log(err.stack)
  }

})

bot.on('message', async message => {
  if (message.author.bot) return
  if(message.channel.type === 'dm') return

  let msgArray = message.content.split(' ')
  let command = msgArray[0]
  let args = msgArray.slice(1)

  console.log(msgArray)
  console.log(command)
  console.log(args)

  if(!command.startsWith(prefix)) return

  if (command === `${prefix}userinfo`) {
    let embed = new discord.RichEmbed()
      .setAuthor(message.author.username)
      .setDescription("this is you username!")
      .setColor("#FF3D6C")
      .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
      .addField("ID", `${message.author.id}`)
      .addField("Created At", `${message.author.createdAt}`)

    message.channel.sendEmbed(embed);

    return
  }

  if(command === `${prefix}mute`) {
    let toMute = message.mentions.users.first() || message.guild.members.get(command)
    if(!toMute) return message.channel.send('You did not specify a user mention or ID!')

    return message.reply(toMute.username || toMute.user.username)
  }

})

bot.login(settings.token)