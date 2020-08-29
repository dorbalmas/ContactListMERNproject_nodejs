const mongoose = require("mongoose");
const config = require("config");

mongoose.connect(
  `mongodb+srv://koko:${config.get(
    "password"
  )}@cluster0-rv00q.gcp.mongodb.net/contacts_list?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected");
});

module.exports = db;
