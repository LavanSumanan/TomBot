import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import db from '../db';

export const data = new SlashCommandBuilder()
  .setName('get')
  .setDescription("Get the number of coins in someone's tomfoolery jar!")
  .addUserOption((option) =>
    option.setName('fool').setDescription('Pick the fool').setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  const user = interaction.options.getUser('fool')!;

  const tally = await db.getTally(user.id);

  if (tally === 'error')
    return interaction.reply({
      content: "ERROR! Getting coin count failed! That's pretty foolish of me 😞",
      ephemeral: true,
    });

  return interaction.reply({
    content: `${user.username}'s tomfoolery jar currently has ${tally} coins. What a buffoon.`,
  });
}
