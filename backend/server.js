const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const contactRoutes = require("./routes/contact");
const nodemailer = require("nodemailer");
const contactController = require("./controllers/contactController");
require("dotenv").config(); // Make sure this line is at the very top

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/api/contact", contactRoutes);

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: "New Contact Message from Portfolio",
    html: `
        <h2>New Message from Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, msg: "Email sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res
      .status(500)
      .json({ success: false, msg: "Failed to send email", error });
  }
});
