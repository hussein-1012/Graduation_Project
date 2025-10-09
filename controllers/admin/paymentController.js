const httpStatus = require('../../utils/httpStatus');

let viewPayments = (req, res) => {
  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Payments management coming soon"
  });
};

module.exports = {
  viewPayments
};
