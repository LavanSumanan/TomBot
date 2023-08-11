import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import db from '../db';

export const data = new SlashCommandBuilder()
  .setName('remove')
  .setDescription("Remove a tally from someone's fool jar!")
  .addUserOption((option) =>
    option.setName('fool').setDescription('Pick the fool').setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  const user = interaction.options.getUser('fool')!;

  const tally = await db.removeTally(user.id);

  if (tally === 'error')
    return interaction.reply({
      content: "ERROR! Removing failed! That's pretty foolish of me 😞",
      ephemeral: true,
    });

  return interaction.reply({
    content: `Removed! ${user.username}'s tally is now ${tally}`,
    ephemeral: true,
  });
}
