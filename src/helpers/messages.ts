import {
  ActionRowBuilder,
  ButtonBuilder,
  Client,
  TextChannel,
} from 'discord.js';
import { addButton } from '../buttons/add';
import { removeButton } from '../buttons/remove';
import channelIds from '../constants/channelIds';
import messageIds from '../constants/messageIds';
import { Fooljar } from '../models/fooljars';

export async function sendGroupTally(client: Client) {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    addButton,
    removeButton
  );

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
    content: `The group tally is currently ???`,
    components: [row],
  });
}

export async function sendMessage({
  client,
  channelId,
  message,
}: {
  client: Client;
  channelId: string;
  message: string;
}) {
  const channel = client.channels.cache.get(channelId) as TextChannel;
  if (!channel) {
    console.log('yikes, no channel?');
    return;
  }

  channel.send(message);
}

export async function editTotalTallyMessage(client: Client, tally: number) {
  const jarChannel = client.channels.cache.get(channelIds.JAR) as TextChannel;
  if (!jarChannel) {
    console.log('yikes, no jar channel?');
    return;
  }

  const totalTallyMessage = await jarChannel.messages.fetch(
    messageIds.ALL_JAR_TOTAL
  );

  if (!totalTallyMessage) {
    console.log('yikes, no message?');
    return;
  }

  totalTallyMessage.edit({
    content: `The total tally is currently ${tally}`,
  });
}

export async function editLeaderboardMessage(
  client: Client,
  entries: [Fooljar]
) {
  let message = `**TOMFOOLERY LEADERBOARD**\n`;

  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];
    let user;
    if (entry.userId === '1') {
      user = 'Group';
    } else {
      user = (await client.users.fetch(entry.userId)).username;
    }
    message += `${user} : ${entry.tally}`;
    if (i !== entries.length - 1) message += '\n';
  }

  const jarChannel = client.channels.cache.get(channelIds.JAR) as TextChannel;
  if (!jarChannel) {
    console.log('yikes, no jar channel?');
    return;
  }

  const leaderboardMessage = await jarChannel.messages.fetch(
    messageIds.LEADERBOARD
  );

  if (!leaderboardMessage) {
    console.log('yikes, no message?');
    return;
  }

  leaderboardMessage.edit({
    content: message,
  });
}
