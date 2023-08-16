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

export const addButton = new ButtonBuilder()
  .setCustomId(buttonIds.ADD)
  .setLabel('Add')
  .setStyle(ButtonStyle.Success);

export async function execute(interaction: ButtonInteraction) {
  const client = interaction.client;
  const adder = interaction.member;

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
    content: `Total coins in the group's tomfoolery jar: ${tally}`,
  });

  const totalTally = await db.getTotalTally();
  if (totalTally === 'error') return;

  editTotalTallyMessage(interaction.client, totalTally);

  const generalChannel = interaction.client.channels.cache.get(
    channelIds.GENERAL
  ) as TextChannel;
  generalChannel.send(
    `${adder} added one coin to the group's jar\nThe group's total is now ${tally}`
  );

  return interaction.reply({ content: 'Added!', ephemeral: true });
}
