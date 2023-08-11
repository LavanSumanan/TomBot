import buttonIds from '../constants/buttonIds';
import * as add from './add';
import * as remove from './remove';

export const buttons = {
  [buttonIds.ADD]: add,
  [buttonIds.REMOVE]: remove,
};
