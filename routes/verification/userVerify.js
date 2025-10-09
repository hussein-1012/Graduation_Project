const express = require('express');
const { User } = require('../../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).send(`
        <div style="font-family: Arial, sans-serif; text-align:center; padding:40px; color:#721c24; background:#f8d7da; border-radius:8px;">
          <h2> Token is required</h2>
        </div>
      `);
    }

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send(`
        <div style="font-family: Arial, sans-serif; text-align:center; padding:40px; color:#856404; background:#fff3cd; border-radius:8px;">
          <h2>⚠️ Invalid or expired token</h2>
          <p>Please request a new verification email.</p>
        </div>
      `);
    }

    if (user.isEmailVerified) {
      return res.send(`
        <div style="font-family: Arial, sans-serif; text-align:center; padding:40px; color:#155724; background:#d4edda; border-radius:8px;">
          <h2> Your email is already verified!</h2>
          <p>You can login now.</p>
        </div>
      `);
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    return res.send(`
      <div style="font-family: Arial, sans-serif; text-align:center; padding:40px; color:#155724; background:#d4edda; border-radius:8px;">
        <h2>Email verified successfully!</h2>
        <p>You can now login to your account.</p>
      </div>
    `);
  } catch (err) {
    console.error("User Verify Error:", err);
    res.status(500).send(`
      <div style="font-family: Arial, sans-serif; text-align:center; padding:40px; color:#721c24; background:#f8d7da; border-radius:8px;">
        <h2>⚠️ Server error</h2>
        <p>Something went wrong. Please try again later.</p>
      </div>
    `);
  }
});

module.exports = router;
