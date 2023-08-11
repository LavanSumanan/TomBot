import { Client } from 'discord.js';
import { deployCommands } from './deploy-commands';
import { commands } from './commands';
import { config } from './config';
import mongoose from 'mongoose';

// MongoDB setup
(async () => {
  await mongoose.connect(config.MONGO_URI || '', {
    keepAlive: true,
  });
})();

const client = new Client({
  intents: ['Guilds', 'GuildMessages'],
});

client.once('ready', async () => {
  console.log('Thomas is Fooling!');
  await deployCommands({ guildId: config.GUILD_ID });
});

client.on('guildCreate', async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
      commands[commandName as keyof typeof commands].execute(interaction);
    }
  } else if (interaction.isButton()) {
    
  }
});


client.login(config.DISCORD_TOKEN);
