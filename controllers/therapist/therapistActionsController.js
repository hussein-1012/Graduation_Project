const httpStatus = require('../../utils/httpStatus');

const accessPatientHistory = async (req, res) => {
  try {
    const { patientId } = req.params;
    return res.status(200).json({
      status: httpStatus.SUCCESS,
      patientId,
      history: ["Session 1: Anxiety", "Session 2: Better mood"],
    });
  } catch (err) {
    res.status(500).json({ status: httpStatus.FAIL, message: err.message });
  }
};

const manageAvailability = async (req, res) => {
  try {
    const { date, available } = req.body;
    return res.status(200).json({
      status: httpStatus.SUCCESS,
      message: `Availability on ${date} set to ${available}`,
    });
  } catch (err) {
    res.status(500).json({ status: httpStatus.FAIL, message: err.message });
  }
};

const viewAssignedPatients = async (req, res) => {
  try {
    return res.status(200).json({
      status: httpStatus.SUCCESS,
      patients: [
        { id: "123", name: "Omar" },
        { id: "124", name: "Sara" },
      ],
    });
  } catch (err) {
    res.status(500).json({ status: httpStatus.FAIL, message: err.message });
  }
};

module.exports = {
  accessPatientHistory,
  manageAvailability,
  viewAssignedPatients,
};
