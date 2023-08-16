import { editLeaderboardMessage } from '../helpers/messages';
import fooljars, { Fooljar } from '../models/fooljars';

export async function getLeaderboard() {
  let entriesSortedByHighestTally;

  try {
    entriesSortedByHighestTally = await fooljars.find({}).sort({ tally: -1 });
  } catch (e) {
    console.error(e);
    return 'error';
  }

  if (entriesSortedByHighestTally.length == 0) return 'error';

  return entriesSortedByHighestTally;
}
