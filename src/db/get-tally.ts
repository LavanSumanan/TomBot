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
