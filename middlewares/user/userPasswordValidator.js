const bcrypt = require("bcryptjs");
let { User } = require("../../models/user");
module.exports = async function (req, res, next) {
  let user = await User.findById(req.body.id);
  const validPassword = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );
  if (!validPassword)
    return res.status(400).send({ error: "Invalid current password!" });
  req.isValidated = true;
  next();
};
