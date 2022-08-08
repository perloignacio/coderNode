const config = require("../config/config");

const userMongo = require("../dao/userMongo");
const userJson = require("../dao/userJson");

class PersistenceFactory {
  static getPersistence = async () => {
    switch (config.app.persistence) {
      case "MONGO":
        return new userMongo();
      case "JSON":
        return new userJson();
      
    }
  };
}

module.exports = PersistenceFactory;
