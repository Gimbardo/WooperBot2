const { SlashCommandBuilder } = require('@discordjs/builders');
const GDrive = require("../lib/gdrive")
require ('custom-env').env()

let GDrivePokemon = new GDrive(process.env.ID_POKEMON_DRIVE, true)
GDrivePokemon.init()

function random(){
  return GDrivePokemon.getRandomLink();
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokemon')
		.setDescription('Returns a random pokemon with a tophat'),
	async execute(interaction) {
		await interaction.reply(random());
	},
};