import dotenv from 'dotenv';

dotenv.config();

const { DISCORD_CLIENT_ID, DISCORD_TOKEN, GUILD_ID, MONGO_URI } = process.env;

if (!DISCORD_CLIENT_ID || !DISCORD_TOKEN || !GUILD_ID || !MONGO_URI) {
  throw new Error('Missing environment variables');
}

export const config = {
  DISCORD_CLIENT_ID,
  DISCORD_TOKEN,
  GUILD_ID,
  MONGO_URI
};
