import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  TextChannel,
} from 'discord.js';
import db from '../db';
import userIds from '../constants/userIds';
import channelIds from '../constants/channelIds';
import messageIds from '../constants/messageIds';
import buttonIds from '../constants/buttonIds';
import { editTotalTallyMessage } from '../helpers/messages';

export const removeButton = new ButtonBuilder()
  .setCustomId(buttonIds.REMOVE)
  .setLabel('Remove')
  .setStyle(ButtonStyle.Danger);

export async function execute(interaction: ButtonInteraction) {
  const client = interaction.client;

  const tally = await db.removeTally(userIds.GROUP);

  if (tally === 'error')
    return interaction.reply({
      content: "ERROR! Removing failed! That's pretty foolish of me 😞",
      ephemeral: true,
    });

  const jarChannel = client.channels.cache.get(channelIds.JAR) as TextChannel;
  if (!jarChannel) {
    console.log('yikes, no jar channel?');
    return;
  }

  const jarMessage = await jarChannel.messages.fetch(
    messageIds.GROUP_JAR_TOTAL
  );

  if (!jarMessage) {
    console.log('yikes, no message?');
    return;
  }

  jarMessage.edit({
    content: `Total coins in the group's tomfoolery jar: ${tally}`,
  });

  const totalTally = await db.getTotalTally();
  if (totalTally !== 'error')
    editTotalTallyMessage(interaction.client, totalTally);

  return interaction.reply({ content: 'Removed!', ephemeral: true });
}
