import fooljars from '../models/fooljars';

export async function addTally(userId: String) {
  let userFooljar;

  // Check if user entry already in table
  try {
    userFooljar = await fooljars.findOne({ userId });
  } catch (e) {
    console.error(e);
  }

  // if user entry in table, increment tally
  if (userFooljar) {
    const tally = userFooljar.tally + 1;
    try {
      await fooljars.findOneAndUpdate({ userId }, { tally });
    } catch (e) {
      console.error(e);
      return 'error';
    }
    return tally;
  }

  // if user entry not in table, create new entry and set tally to 1
  const tally = 1;
  try {
    await new fooljars({ userId, tally }).save();
  } catch (e) {
    console.error(e);
    return 'error';
  }
  return tally;
}
