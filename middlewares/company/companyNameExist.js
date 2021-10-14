let companyService = require("../../models/company/companyService");
module.exports = async function (req, res, next) {
  console.log("company name", req.body.data.company);
  let company = await companyService.findOne({
    companyName: req.body.data.companyName,
  });
  if (!company)
    return res
      .status(400)
      .send({ error: "Company with given name not found!" });
  req.isValidated = true;
  next();
};
