const UserMongo = require("../models/userMongo");

class User {
  constructor() {
    this.model = UserMongo;
  }
  getAll = async () => {
    return await this.model.find();
  };
  save = async (user) => {
    return await this.model.create(user);
  };
}

module.exports = User;
