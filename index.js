const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create the bot client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ]
});

// Set command prefix
const prefix = '!';

// Load command files
const commands = new Map();
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
}

// When bot is ready
client.once('ready', () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

// When a message is received
client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('❌ There was an error executing that command.');
  }
});

// Login with token
client.login(process.env.TOKEN);
