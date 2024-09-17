const nodemailer = require("nodemailer");
P;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "recipient@example.com",
  subject: "👋 Hello from Node.js 🚀",
  text: "This is a test email sent from Node.js using nodemailer. 📧💻",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("❌ Error:", error.message);
  } else {
    console.log("✅ Email sent:", info.response);
  }
});
