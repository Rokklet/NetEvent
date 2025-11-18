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
