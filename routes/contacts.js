const express = require("express");
const router = express.Router();
const { contactSchema, validContact } = require("../myModels/contacts_model");
const cors = require("cors");
router.use(cors());
// "http://localhost:3000/contacts"
router.get("/", (req, res, next) => {
  contactSchema.find({}).then((data) => {
    res.json(data);
  });
});

// `http://localhost:3000/contacts/singleContact/${}`
router.get("/singleContact/:id", (req, res, next) => {
  contactSchema
    .findOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
// "http://localhost:3000/contacts/addContact"
router.post("/addContact", async (req, res) => {
  let dataBody = req.body;
  let contact = await validContact(dataBody);
  if (contact.error) {
    console.log(contact.error.details[0]);
    res.status(400).json(contact.error.details[0]);
  } else {
    try {
      let saveData = await contactSchema.insertMany([req.body]);
      res.json(saveData[0]);
    } catch {
      res.status(400).json({
        message: "Error!! This contact is already in the system!",
      });
    }
  }
});
// "http://localhost:3000/contacts/updateContact"
router.post("/updateContact", async (req, res) => {
  let dataBody = req.body;
  let contact = await validContact(dataBody);
  if (contact.error) {
    res.status(400).json(contact.error.details[0]);
  } else {
    try {
      let updatedData = await contactSchema.updateOne(
        { _id: req.body._id },
        req.body
      );
      res.json(updatedData);
    } catch {
      res.status(400).json({ message: "Error!! id is not found" });
    }
  }
});
// "http://localhost:3000/contacts/removeContact"
router.post("/removeContact", (req, res) => {
  contactSchema.deleteOne({ _id: req.body._id }).then((data) => {
    if (data.deletedCount > 0) {
      res.json({ message: "deleted" });
    } else {
      res.status(400).json({ error: "error id not found" });
    }
  });
});
// `http://localhost:3000/contacts/searchContact/?q=${}`
router.get("/searchContact/", (req, res) => {
  const mySearch = new RegExp(`${req.query.q}`);
  contactSchema
    .find({
      $or: [
        { first_name: mySearch },
        { last_name: mySearch },
        { email: mySearch },
        { area_code: mySearch },
        { phone_number: mySearch },
      ],
    })
    .then((data) => {
      res.json(data);
    });
});

module.exports = router;
