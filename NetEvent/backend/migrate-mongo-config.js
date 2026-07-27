/*
module.exports = {
  mongodb: {
    url: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/",
    databaseName: process.env.MONGO_DB || "netevent",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog"
};
*/

require("dotenv").config();

const mongoUrl = process.env.MONGO_URI;
const databaseName = process.env.MONGO_DB || "netevent";

if (!mongoUrl) throw new Error("Falta configurar MONGO_URI");


module.exports = {
  mongodb: {
    url: mongoUrl,
    databaseName,
    options: {},
  },

  migrationsDir: "migrations",

  changelogCollectionName: "migration_changelog",

  lockCollectionName: "migration_lock",

  lockTtl: 0,

  migrationFileExtension: ".js",

  useFileHash: false,

  moduleSystem: "commonjs",
};