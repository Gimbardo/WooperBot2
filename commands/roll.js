const { SlashCommandBuilder } = require('@discordjs/builders');
const lib = require('../lib/utility')

function roll(dice_type){
  if( dice_type < 1 )
    return `Valore Massimo ${dice_type} non valido :game_die:`

  return `You rolled ${lib.getRandomInt(1,dice_type)} out of ${dice_type} :game_die:`
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls a d20, or any dice you want!')
    .addIntegerOption(option => option.setName('dice').setDescription('Max value that can be rolled')),
	async execute(interaction) {
    let dice_type = interaction.options.getInteger('dice') || 20
    await interaction.reply(roll(dice_type));
	},
};
