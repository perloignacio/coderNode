require("dotenv").config();

module.exports = {
  app: {
    persistence: process.env.PERSISTENCE,
    mongo: process.env.MONGO_URI,
    file: process.env.FILE_JSON
  },
};