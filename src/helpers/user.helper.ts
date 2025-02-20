import Helper from '../interfaces/helper';
import UserModel from '../models/user.model';

class UserInterface extends Helper {
  modelName: string;
  db: any;

  constructor(db: any, modelName: string) {
    super(db, modelName);
    this.modelName = modelName;
    this.db = db;
  }
}

const UserHelper = new UserInterface(UserModel, 'USER_Model');

export default UserHelper;
