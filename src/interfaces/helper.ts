class Helper {
  modelName: string;
  db: any;
  constructor(db: any, modelName: string) {
    this.modelName = modelName;
    this.db = db;
  }

  // To Create a record
  async create(data: any, session?: any) {
    try {
      const newData: any = new this.db(data);
      const createData = await newData.save({ session });
      return createData;
    } catch (error: any) {
      throw new Error(
        `Error Occurs while find query in ${this.modelName}, ERROR: ${
          error.errorMessage || error.message
        }`
      );
    }
  }

  async findOne(
    query: object,
    selectField: string = '',
    populatedField: any = '',
    session?: any
  ) {
    try {
      const data = await this.db
        .findOne(query, selectField)
        .populate(populatedField);
      return data;
    } catch (error: any) {
      throw new Error(
        `Error Occurs while find query in ${this.modelName}, ERROR: ${
          error.errorMessage || error.message
        }`
      );
    }
  }

  async findAll(
    query: object,
    selectField: string = '',
    sortBy: object = {},
    populatedField: any = ''
  ) {
    try {
      const data = await this.db
        .find(query, selectField)
        .sort(sortBy)
        .populate(populatedField);
      return data;
    } catch (error: any) {
      throw new Error(
        `Error Occurs while find all query in ${this.modelName}, ERROR: ${
          error.errorMessage || error.message
        }`
      );
    }
  }

  async findOneAndUpdate(
    query: Object,
    setData: Object,
    selectField: string = '',
    session?: any
  ) {
    try {
      const data: any = await this.db.findOneAndUpdate(query, setData, {
        new: true,
        select: selectField,
        session,
      });
      return data;
    } catch (error: any) {
      throw new Error(
        `Error Occurs while Find and Update query in ${
          this.modelName
        }, ERROR: ${error.errorMessage || error.message}`
      );
    }
  }

  async aggregate(aggregateQuery: any) {
    try {
      const data: any = await this.db.aggregate(aggregateQuery);
      return data;
    } catch (error: any) {
      throw new Error(
        `Error Occurs while Aggregate query in ${this.modelName}, ERROR: ${
          error.errorMessage || error.message
        }`
      );
    }
  }

  async updateMany(query: object, setData: any, session?: any) {
    try {
      const data: any = await this.db.updateMany(query, setData, { session });
      return data;
    } catch (error: any) {
      throw new Error(
        `Error Occurs while update all query in ${this.modelName}, ERROR: ${
          error.errorMessage || error.message
        }`
      );
    }
  }

  async updateOne(query: object, setData: any, session?: any) {
    try {
      const data: any = await this.db.findOneAndUpdate(query, setData, {
        new: true,
        session,
      });
      return data;
    } catch (error: any) {
      throw new Error(
        `Error Occurs while update one query in ${this.modelName}, ERROR: ${
          error.errorMessage || error.message
        }`
      );
    }
  }

  async upsertOne(query: object, setData: any, session?: any) {
    try {
      const data: any = await this.db.findOneAndUpdate(query, setData, {
        new: true,
        upsert: true,
        session,
      });
      return data;
    } catch (error: any) {
      throw new Error(
        `Error Occurs while update all query in ${this.modelName}, ERROR: ${
          error.errorMessage || error.message
        }`
      );
    }
  }

  async delete(query: Object, session?: any) {
    try {
      const data: any = await this.db.findOneAndDelete(query, { session });
      return data;
    } catch (error: any) {
      throw new Error(
        `Error Occurs while delete query in ${this.modelName}, ERROR: ${
          error.errorMessage || error.message
        }`
      );
    }
  }
}

export default Helper;
