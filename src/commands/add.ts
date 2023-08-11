import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import db from '../db';

export const data = new SlashCommandBuilder()
  .setName('add')
  .setDescription("Add a tally to someone's fool jar!")
  .addUserOption((option) =>
    option.setName('fool').setDescription('Pick the fool').setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  const user = interaction.options.getUser('fool')!;

  const tally = await db.addTally(user.id);

  if (tally === 'error')
    return interaction.reply({
      content: "ERROR! Adding failed! That's pretty foolish of me 😞",
      ephemeral: true,
    });

  return interaction.reply({
    content: `Added! ${user.username}'s tally is now ${tally}`,
    ephemeral: true,
  });
}
