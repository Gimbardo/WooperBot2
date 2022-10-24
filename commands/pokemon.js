const { SlashCommandBuilder } = require('@discordjs/builders');
const GDrive = require("../lib/gdrive")
require ('custom-env').env()

let GDrivePokemon = new GDrive(process.env.ID_POKEMON_DRIVE, true)
GDrivePokemon.init()

function random(){
  return GDrivePokemon.getRandomLink();
}

function pokemon_with_id(pokedex_id){
	return GDrivePokemon.getLinkWithNameThatStartsWith(pokedex_id)
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokemon')
		.setDescription('Returns a random (or selected by number on the pokedex) pokemon with a tophat')
    	.addIntegerOption(option => option.setName('pokedex_id').setDescription('id on the national pokedex')),
	async execute(interaction) {
		let pokedex_id = interaction.options.getInteger('pokedex_id')
		if(pokedex_id != null)
			await interaction.reply(random());
		else
			await interaction.reply(pokemon_with_id(pokedex_id-1));
	},
};