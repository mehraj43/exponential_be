import { dbConnection } from '../db';
import { Document, Schema } from 'mongoose';
import { MODEL_NAME } from '../utils/constants/db.constant';

interface IGame extends Document {
  user_id: Schema.Types.ObjectId;
  totalScore: number;
  prizesWon: number;
}

const gameSchema: Schema<IGame> = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAME.USER,
      required: true,
    },
    totalScore: { type: Number, default: 0 },
    prizesWon: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const GameModel = dbConnection.model(MODEL_NAME.GAME, gameSchema);

export default GameModel;
