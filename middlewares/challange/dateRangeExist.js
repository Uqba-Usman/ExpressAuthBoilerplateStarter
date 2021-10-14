let challangeService = require("../../models/challange/challangeService");
module.exports = async function (req, res, next) {
  var challangeExist = await challangeService.findOne({
    expiryDate: { $lte: req.body.startDate },
  });
  if (challangeExist)
    return res
      .status(400)
      .send({ error: "Challange in this date range already exist" });

  req.isValidated = true;
  next();
};
