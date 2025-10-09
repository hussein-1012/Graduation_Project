const httpStatus = require('../../utils/httpStatus');


const bookSession = async (req, res) => {
  try {
    const { date, time, therapistId } = req.body;
    // logic to store booking in DB
    return res.status(201).json({
      status: httpStatus.SUCCESS,
      message: `Session booked with therapist ${therapistId} at ${date} ${time}`,
    });
  } catch (err) {
    res.status(500).json({ status: httpStatus.FAIL, message: err.message });
  }
};

const trackMood = async (req, res) => {
  try {
    const { mood } = req.body;
    // logic to save mood tracking
    return res.status(200).json({
      status: httpStatus.SUCCESS,
      message: `Mood "${mood}" tracked successfully.`,
    });
  } catch (err) {
    res.status(500).json({ status: httpStatus.FAIL, message: err.message });
  }
};

// const interactWithAI = async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     // logic to interact with LLM (later)
//     return res.status(200).json({
//       status: httpStatus.SUCCESS,
//       response: `AI response for: "${prompt}"`,
//     });
//   } catch (err) {
//     res.status(500).json({ status: httpStatus.FAIL, message: err.message });
//   }
// };

module.exports = {
  bookSession,
  trackMood,
  //interactWithAI,
};
