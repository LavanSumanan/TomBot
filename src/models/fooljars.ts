import mongoose from 'mongoose';

export interface Fooljar {
  userId: string;
  tally: number;
}

const fooljarSchema = new mongoose.Schema<Fooljar>({
  userId: {
    type: String,
    required: true,
  },
  tally: {
    type: Number,
    required: true,
  },
});

const fooljarModel = mongoose.model<Fooljar>('fooljars', fooljarSchema);

export default fooljarModel;
