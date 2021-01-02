const mongoose = require("mongoose");

let downloadHistorySchema = mongoose.Schema({
  name: { type: String, required: true },
  date: {
    type: String,
    default:
      (new Date().getDate() > 9
        ? new Date().getDate()
        : "0" + new Date().getDate()) +
      "/" +
      (new Date().getMonth() > 8
        ? new Date().getMonth() + 1
        : "0" + (new Date().getMonth() + 1)) +
      "/" +
      new Date().getFullYear(),
  },
  json: { type: String, required: true },
});

exports.downloadHistorySchema = mongoose.model(
  "downloads",
  downloadHistorySchema
);
