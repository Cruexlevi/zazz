const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const { token } = require('./config.json');
const commandHandler = require('./commandHandler');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  try {
    await client.application.commands.set(commandHandler.map(command => command.data));
    console.log('Commands set successfully!');
  } catch (error) {
    console.error('Error setting commands:', error);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = commandHandler.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply('There was an error trying to execute that command!');
  }
});

client.login(token);
