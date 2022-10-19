const { SlashCommandBuilder } = require('@discordjs/builders');
const api_endpoint = 'https://api.gimbaro.dev/daily_fact'
const axios = require('axios')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('spaggomatic')
		.setDescription('Returns a random fact happened on the same day of the year of today'),
	async execute(interaction) {

    axios.get(api_endpoint)
    .then((res) => {
      let message = ""
      Object.entries(res.data).map(([k,v]) => {  message = `In ${k}: ${v}` })
      interaction.reply(message)
    })
    .catch((err) => {
      console.error("error: ", err)
    })
	},
};
