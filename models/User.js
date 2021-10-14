var mongoose = require("mongoose");
const Joi = require("@hapi/joi"); //for validating data in mongoose

const modelSchema = new mongoose.Schema(
  {
    name: String,
    userName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    address: String,
    phoneNo: String,
    membership: String,
    role: { type: String, default: "user" },
    profileImage: String,
  },
  { timestamps: true }
);

modelSchema.statics.validate = function (data) {
  const schema = Joi.object({
    _id: Joi.string(),
    name: Joi.string(),
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(1024).required(),
    address: Joi.string(),
    phoneNo: Joi.string(),
  }).options({ abortEarly: false });
  return schema.validate(data);
};

modelSchema.statics.validateUpdate = function (data) {
  const schema = Joi.object({
    name: Joi.string(),
    userName: Joi.string(),
    email: Joi.string().email(),
    address: Joi.string(),
    phoneNo: Joi.string(),
  }).options({ abortEarly: false });
  return schema.validate(data);
};

const User = mongoose.model("User", modelSchema);
module.exports.User = User;
// module.exports.validate = validate;
// module.exports.validateUpdate = validateUpdate;
