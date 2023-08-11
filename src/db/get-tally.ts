import fooljars from '../models/fooljars';

export async function getTally(userId: String) {
  let userFooljar;

  try {
    userFooljar = await fooljars.findOne({ userId });
    return userFooljar ? userFooljar.tally : 'error';
  } catch (e) {
    console.error(e);
    return 'error';
  }
}

export async function getTotalTally() {
  let allfooljars;
  try {
    let totalTally = 0;

    allfooljars = await fooljars.find({});
    for (let jar of allfooljars) {
      totalTally += jar.tally;
    }
    return totalTally;
  } catch (e) {
    console.error(e);
    return 'error';
  }
}
