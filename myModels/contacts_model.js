const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

let contactSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  last_name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    maxLength: 99,
  },
  area_code: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

exports.contactSchema = mongoose.model("contacts", contactSchema);

const validContact = (_contact) => {
  const JoiSchema = Joi.object({
    _id: Joi.string(),
    first_name: Joi.string().min(2).max(20).required(),
    last_name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    area_code: Joi.string().required(),
    phone_number: Joi.string().required(),
    date: Joi.string().required(),
  });

  return JoiSchema.validate(_contact);
};

exports.validContact = validContact;
