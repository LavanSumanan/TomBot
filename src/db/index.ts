import { addTally } from './add-tally';
import { removeTally } from './remove-tally';
import { getTally, getTotalTally } from './get-tally';

const db = {
  addTally,
  removeTally,
  getTally,
  getTotalTally,
};

export default db;
