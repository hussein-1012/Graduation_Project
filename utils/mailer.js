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

async function sendParentVerificationEmail(parentEmail, token, { childName, childEmail }) {
  const verifyUrl = `${process.env.BACKEND_URL}/api/parent/verify?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color:#007BFF;">👨‍👩‍👧 Parent Verification for ${childName}</h2>
      <p>Hello,</p>
      <p>Your child <strong>${childName}</strong> (<a href="mailto:${childEmail}">${childEmail}</a>) has created a new account on the Tammeny Application.</p>
      <p>To confirm and approve this account, please click the button below:</p>
      
      <p style="margin:20px 0;">
        <a href="${verifyUrl}" 
           style="display:inline-block;padding:12px 20px;background:#007BFF;color:#fff;
                  font-weight:bold;text-decoration:none;border-radius:6px;">
           Verify and Approve ${childName}
        </a>
      </p>

      <p style="margin-top:20px;font-size:13px;color:#666;">
        If you are not the parent or guardian, you can safely ignore this email and the account will not be activated.
      </p>
    </div>
  `;

  const info = await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: parentEmail,
    subject: `Parent Verification for ${childName}`,
    html
  });

  return info;
}

module.exports = { sendParentVerificationEmail };
