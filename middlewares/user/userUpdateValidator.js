let { User } = require("../../models/user");

module.exports = async function (req, res, next) {
  const { error } = await User.validateUpdate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  req.isValidated = true;
  next();
};
