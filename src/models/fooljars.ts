import mongoose from 'mongoose';

const fooljarSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  tally: {
    type: Number,
    required: true,
  },
});

const fooljarModel = mongoose.model('fooljars', fooljarSchema);

export default fooljarModel;
