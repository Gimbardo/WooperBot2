const { SlashCommandBuilder } = require('@discordjs/builders');
const GDrive = require("../lib/gdrive")
require ('custom-env').env()

let GDrivePepe = new GDrive(process.env.ID_PEPE_DRIVE, false)
GDrivePepe.init()

function random(){
  return GDrivePepe.getRandomLink();
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pepe')
		.setDescription('Returns a random pepe'),
	async execute(interaction) {
		await interaction.reply(random());
	},
};
