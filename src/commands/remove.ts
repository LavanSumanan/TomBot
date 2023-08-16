import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import db from '../db';
import {
  editLeaderboardMessage,
  editTotalTallyMessage,
} from '../helpers/messages';
import { Fooljar } from '../models/fooljars';

export const data = new SlashCommandBuilder()
  .setName('remove')
  .setDescription("Remove a coin from someone's tomfoolery jar!")
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

  const totalTally = await db.getTotalTally();
  if (totalTally !== 'error')
    editTotalTallyMessage(interaction.client, totalTally);

  editLeaderboardMessage(
    interaction.client,
    (await db.getLeaderboard()) as unknown as [Fooljar]
  );

  return interaction.reply({
    content: `Removed! ${user.username}'s jar now has ${tally} coins`,
    ephemeral: true,
  });
}
