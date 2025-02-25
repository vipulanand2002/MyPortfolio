require("dotenv").config();
import express from "express";
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Nodemailer Transporter (Sendinblue SMTP)
const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: process.env.SMTP_EMAIL, // Your Sendinblue email
    pass: process.env.SMTP_PASSWORD, // Your Sendinblue SMTP password
  },
});

// Email Route
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const mailOptions = {
      from: email, // Sender email
      to: "your-email@example.com", // Your email where you receive messages
      subject: `New Contact Request from ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
