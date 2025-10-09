const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendUserVerificationEmail(userEmail, token) {
  const verifyUrl = `${process.env.BACKEND_URL}/api/verify/user?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color:#28a745;">📧 Verify Your Email</h2>
      <p>Hello,</p>
      <p>Thank you for registering. Please verify your email address to activate your account.</p>
      
      <p style="margin:20px 0;">
        <a href="${verifyUrl}" 
           style="display:inline-block;padding:12px 20px;background:#28a745;color:#fff;
                  font-weight:bold;text-decoration:none;border-radius:6px;">
           ✅ Verify My Email
        </a>
      </p>

      <p style="margin-top:20px;font-size:13px;color:#666;">
        If you didn’t create this account, just ignore this email.
      </p>
    </div>
  `;

  return transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: userEmail,
    subject: "Verify your email address",
    html
  });
}

module.exports = { sendUserVerificationEmail };
