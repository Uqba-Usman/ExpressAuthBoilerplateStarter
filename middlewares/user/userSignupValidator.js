let { User } = require("../../models/user");
module.exports = async function (req, res, next) {
  let user = await User.findOne({
    email: req.body.email,
  });
  if (user)
    return res
      .status(400)
      .send({ error: "User with given email already registered!" });
  req.isValidated = true;
  next();
};
