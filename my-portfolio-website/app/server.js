require("dotenv").config();
import express from "express";
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL })); // Set CORS for frontend domain

// Nodemailer Transporter (Brevo SMTP)
const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: process.env.SMTP_EMAIL, // Your Brevo-verified email
    pass: process.env.SMTP_PASSWORD, // Brevo SMTP password
  },
});

// Email Route
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const mailOptions = {
      from: `"${name}" <no-reply@yourdomain.com>`, // Use your verified domain
      to: process.env.RECEIVER_EMAIL, // Your email where you receive messages
      replyTo: email, // Set user's email as reply-to
      subject: `New Contact Request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
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
  console.log(`Server running on http://localhost:${PORT}`);
});
