import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  TextChannel,
} from 'discord.js';
import db from '../db';
import { editTotalTallyMessage } from '../helpers/messages';
import channelIds from '../constants/channelIds';

export const data = new SlashCommandBuilder()
  .setName('add')
  .setDescription("Add a coin to someone's tomfoolery jar!")
  .addUserOption((option) =>
    option.setName('fool').setDescription('Pick the fool').setRequired(true)
  )
  .addStringOption((option) =>
    option.setName('reason').setDescription('Explain why they a fool')
  );

export async function execute(
  interaction: ChatInputCommandInteraction<CacheType>
) {
  const user = interaction.options.getUser('fool')!;
  const reason =
    interaction.options.getString('reason') ?? 'They just a fool tbh';

  const adder = interaction.member;

  const tally = await db.addTally(user.id);

  if (tally === 'error')
    return interaction.reply({
      content: "ERROR! Adding failed! That's pretty foolish of me 😞",
      ephemeral: true,
    });

  const totalTally = await db.getTotalTally();
  if (totalTally !== 'error')
    editTotalTallyMessage(interaction.client, totalTally);

  const generalChannel = interaction.client.channels.cache.get(
    channelIds.GENERAL
  ) as TextChannel;
  generalChannel.send(
    `${adder} added one coin to ${user}'s tomfoolery jar for the following reason:\n> ${reason}\n${user.username}'s jar now has ${tally} coins`
  );

  return interaction.reply({
    content: `Added! ${user.username}'s tally is now ${tally}`,
    ephemeral: true,
  });
}
