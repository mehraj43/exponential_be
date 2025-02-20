import { dbConnection } from '../db';
import { Document, Schema } from 'mongoose';
import { MODEL_NAME } from '../utils/constants/db.constant';

interface IUser extends Document {
  name: string;
  email: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = dbConnection.model(MODEL_NAME.USER, userSchema);

export default UserModel;
