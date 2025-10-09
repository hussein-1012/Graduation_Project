const express = require('express');
const { User } = require('../../models/User');
const router = express.Router();

router.get('/verify', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).send(`
        <div style="font-family: Arial, sans-serif; text-align:center; padding:40px; color:#721c24; background:#f8d7da; border-radius:8px;">
          <h2>Token is required</h2>
        </div>
      `);
    }

    const user = await User.findOne({
      parentVerificationToken: token,
      parentVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send(`
        <div style="font-family: Arial, sans-serif; text-align:center; padding:40px; color:#856404; background:#fff3cd; border-radius:8px;">
          <h2>⚠️ Invalid or expired token</h2>
          <p>Please request a new verification link.</p>
        </div>
      `);
    }

    user.parentVerified = true;
    user.parentVerificationToken = undefined;
    user.parentVerificationExpires = undefined;
    await user.save();

    return res.send(`
      <div style="font-family: Arial, sans-serif; text-align:center; padding:40px; color:#155724; background:#d4edda; border-radius:8px;">
        <h2>Parent verification successful</h2>
        <p>The child's account is now activated. You can safely close this window.</p>
      </div>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send(`
      <div style="font-family: Arial, sans-serif; text-align:center; padding:40px; color:#721c24; background:#f8d7da; border-radius:8px;">
        <h2>⚠️ Server error</h2>
        <p>Something went wrong. Please try again later.</p>
      </div>
    `);
  }
});

module.exports = router;
