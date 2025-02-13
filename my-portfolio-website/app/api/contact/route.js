export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    const sendinblueApiKey = process.env.SENDINBLUE_API_KEY;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": sendinblueApiKey,
      },
      body: JSON.stringify({
        sender: { email: "ishasinghal2002@gmail.com", name: "College ID" },
        to: [{ email: "karnvipul2002@gmail.com", name: "Vipul's ID" }],
        subject: `New Contact Request from ${name}`,
        htmlContent: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Sendinblue API error:", result);
      return Response.json({ success: false, message: "Failed to send email" }, { status: 500 });
    }

    return Response.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ success: false, message: "Failed to send email" }, { status: 500 });
  }
}
