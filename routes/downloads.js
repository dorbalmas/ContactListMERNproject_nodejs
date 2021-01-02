const express = require("express");
const router = express.Router();
const { downloadHistorySchema } = require("../myModels/download_model");
const cors = require("cors");
router.use(cors());
// "http://localhost:3000/downloads"
router.get("/", (req, res, next) => {
  downloadHistorySchema.find({}).then((data) => {
    res.json(data);
  });
});

// `http://localhost:3000/downloads/singledownload/${}`
router.get("/singledownload/:id", (req, res, next) => {
  downloadHistorySchema
    .findOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
// "http://localhost:3000/downloads/adddownload"
router.post("/adddownload", async (req, res) => {
  if (req.body.error) {
    console.log(req.body.error.details[0]);
    res.status(400).json(req.body.error.details[0]);
  } else {
    try {
      let saveData = await downloadHistorySchema.insertMany([req.body]);
      res.json(saveData[0]);
    } catch {
      res.status(400).json({
        message: "Error!! ",
      });
    }
  }
});
// "http://localhost:3000/downloads/updatedownload"
router.post("/updatedownload", async (req, res) => {
  if (req.body.error) {
    res.status(400).json(req.body.error.details[0]);
  } else {
    try {
      let updatedData = await downloadHistorySchema.updateOne(
        { _id: req.body._id },
        req.body
      );
      res.json(updatedData);
    } catch {
      res.status(400).json({ message: "Error!! id is not found" });
    }
  }
});
// "http://localhost:3000/downloads/removedownload"
router.post("/removedownload", (req, res) => {
  downloadHistorySchema.deleteOne({ _id: req.body._id }).then((data) => {
    if (data.deletedCount > 0) {
      res.json({ message: "deleted" });
    } else {
      res.status(400).json({ error: "error id not found" });
    }
  });
});

module.exports = router;
