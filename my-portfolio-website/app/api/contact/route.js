import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    // Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_EMAIL,  // Use your verified Brevo email
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email Options
    const mailOptions = {
      from: `"${name}" <${process.env.VERIFIED_EMAIL}>`, // Always send from your verified email
      to: process.env.RECEIVER_EMAIL,  // Your email where you receive messages
      subject: `New Contact Request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      replyTo: email,  // Allows you to reply directly to the sender
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true, message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ success: false, message: "Failed to send email" }, { status: 500 });
  }
}
