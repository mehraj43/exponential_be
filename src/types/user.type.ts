export interface USER_TYPE {
  _id: any;
  name: string;
  email: string;
  password: string;
  createdAt: any;
  updatedAt: any;
}

export type USER = Partial<USER_TYPE>;
