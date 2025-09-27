// utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const sendTaskNotification = async (toEmail, taskTitle) => {
  const loginUrl = "http://localhost:3000/login";
  const mailOptions = {
    from:  process.env.GMAIL_USER,
    to: toEmail,
    subject: '📝 New Task Assigned to You',
    html: `
      <p>Hi,</p>
      <p>You have been assigned a new task: <strong>${taskTitle}</strong></p>
      <p>Click the button below to log in and view your task:</p>
      <a href="${loginUrl}" style="display:inline-block;padding:10px 20px;background:#007BFF;color:#fff;text-decoration:none;border-radius:5px;">Login to Dashboard</a>
      <p>Or copy this link into your browser: <br> <a href="${loginUrl}">${loginUrl}</a></p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Notification email sent to', toEmail);
  } catch (err) {
    console.error('❌ Failed to send email:', err);
  }
};

module.exports = { sendTaskNotification };
