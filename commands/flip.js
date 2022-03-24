const { SlashCommandBuilder } = require('@discordjs/builders');
const lib = require('../lib/utility')

function flip(){
  if( lib.getRandomInt(0,1) )
    return "Head"
  return "Tail"
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('flip')
		.setDescription('Flips a coin!'),
	async execute(interaction) {
		await interaction.reply(flip());
	},
};

