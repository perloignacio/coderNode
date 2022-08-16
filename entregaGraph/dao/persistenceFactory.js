const config = require("../config/config");

const productosMongo = require("../dao/productosMongo");


class PersistenceFactory {
  static getPersistence = async () => {
    switch (config.app.persistence) {
      case "MONGO":
        return new productosMongo();
      
      
    }
  };
}

module.exports = PersistenceFactory;
