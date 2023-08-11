import fooljars from '../models/fooljars';

export async function removeTally(userId: String) {
  let userFooljar;

  // Check if user entry already in table
  try {
    userFooljar = await fooljars.findOne({ userId });
  } catch (e) {
    console.error(e);
  }

  // if user entry in table, decrement tally
  if (userFooljar) {
    const tally = userFooljar.tally > 0 ? userFooljar.tally - 1 : 0;
    try {
      await fooljars.findOneAndUpdate({ userId }, { tally });
    } catch (e) {
      console.error(e);
      return 'error';
    }
    return tally;
  }

  // if user entry not in table, create new entry and set tally to 0
  const tally = 0;
  try {
    await new fooljars({ userId, tally }).save();
  } catch (e) {
    console.error(e);
    return 'error';
  }
  return tally;
}
