import { addTally } from './add-tally';
import { removeTally } from './remove-tally';
import { getTally, getTotalTally } from './get-tally';
import { getLeaderboard } from './get-leaderboard';

const db = {
  addTally,
  removeTally,
  getTally,
  getTotalTally,
  getLeaderboard,
};

export default db;
