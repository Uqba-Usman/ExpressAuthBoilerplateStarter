const bcrypt = require("bcryptjs");
let { User } = require("../../models/user");
module.exports = async function (req, res, next) {
  let user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send({ error: "Invalid email!" });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ error: "Invalid password!" });
  req.isValidated = true;
  next();
};
