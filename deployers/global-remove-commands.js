const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require ('custom-env').env()

const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;
const { SlashCommandBuilder } = require('@discordjs/builders');

const rest = new REST({ version: '9' }).setToken(token);

rest.get(Routes.applicationCommands(clientId))
.then(data => {
  const promises = [];
  for (const command of data) {
    const deleteUrl = `${Routes.applicationCommands(clientId)}/${command.id}`
    promises.push(rest.delete(deleteUrl))
  }
  return Promise.all(promises)
})
