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

export const addButton = new ButtonBuilder()
  .setCustomId(buttonIds.ADD)
  .setLabel('Add')
  .setStyle(ButtonStyle.Success);

export async function execute(interaction: ButtonInteraction) {
  const client = interaction.client;

  const tally = await db.addTally(userIds.GROUP);

  if (tally === 'error')
    return interaction.reply({
      content: "ERROR! Adding failed! That's pretty foolish of me 😞",
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
    content: `The group tally is currently ${tally}`,
  });

  return interaction.reply({ content: 'Added!', ephemeral: true });
}
