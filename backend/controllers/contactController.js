require("dotenv").config();

nodemailer = require("nodemailer");

exports.handleContactForm = (req, res) => {
  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required" });
  }

  console.log("Contact Form Submission:", { name, email, message });

  // Create the email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: "Hellow Mr Ahmed New Contact Message from your Portfolio",
    html: `
      <h2>New Message from Portfolio</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  // Try to send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res
        .status(500)
        .json({ status: "error", message: "Failed to send email", error });
    }

    console.log("Email sent:", info.response);
    return res
      .status(200)
      .json({ status: "success", message: "Message received successfully" });
  });
};

console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
