import { Client } from 'discord.js';
import { deployCommands } from './deploy-commands';
import { commands } from './commands';
import { buttons } from './buttons';
import { config } from './config';
import mongoose from 'mongoose';
import { sendGroupTally, sendMessage } from './helpers/messages';

// MongoDB setup
(async () => {
  await mongoose.connect(config.MONGO_URI || '', {
    keepAlive: true,
  });
})();

const client = new Client({
  intents: ['Guilds', 'GuildMessages'],
});

client.once('ready', async (client) => {
  client.user.setAvatar('./avatar.png');
  console.log('Thomas is Fooling!');
  await deployCommands({ guildId: config.GUILD_ID });
  // await sendGroupTally(client);
  // await sendMessage({ client, channelId: channelIds.JAR, message: 'doot' });
});

client.on('guildCreate', async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
      await commands[commandName as keyof typeof commands].execute(interaction);
    }
  } else if (interaction.isButton()) {
    const { customId } = interaction;
    if (buttons[customId as keyof typeof buttons]) {
      await buttons[customId as keyof typeof buttons].execute(interaction);
    }
  }
});

client.login(config.DISCORD_TOKEN);
