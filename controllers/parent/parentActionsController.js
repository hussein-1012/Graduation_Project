const httpStatus = require('../../utils/httpStatus');

const viewChildReports = async (req, res) => {
  try {
    return res.status(200).json({
      status: httpStatus.SUCCESS,
      reports: [
        { childId: "123", mood: "Happy", sessionCount: 5 },
      ],
    });
  } catch (err) {
    res.status(500).json({ status: httpStatus.FAIL, message: err.message });
  }
};

const monitorRisks = async (req, res) => {
  try {
    return res.status(200).json({
      status: httpStatus.SUCCESS,
      message: "No critical risks detected.",
    });
  } catch (err) {
    res.status(500).json({ status: httpStatus.FAIL, message: err.message });
  }
};

const manageChildAccount = async (req, res) => {
  try {
    const { childId, action } = req.body;
    return res.status(200).json({
      status: httpStatus.SUCCESS,
      message: `Child account ${childId} ${action}ed successfully`,
    });
  } catch (err) {
    res.status(500).json({ status: httpStatus.FAIL, message: err.message });
  }
};

module.exports = {
    viewChildReports,
    monitorRisks, 
    manageChildAccount 
};
