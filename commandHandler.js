const fs = require('node:fs');
const path = require('node:path');

const { Collection } = require('discord.js');

const client = new Collection();

const commandsPath = path.join(__dirname, 'commands');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`${commandsPath}/${file}`);
  client.set(command.data.name, command);
}

module.exports = client;
