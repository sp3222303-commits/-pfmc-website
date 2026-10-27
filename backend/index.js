// =====================================================
// PFMC - PROP FACILITY MANAGEMENT COMPANY
// BACKEND - index.js
// Contact Enquiry + Careers Application + Gmail
// =====================================================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

// Load templates AFTER dotenv so SITE_URL / COMPANY_PHONE are available
const {
  contactClientEmail,
  contactHrEmail,
  careerApplicantEmail,
  careerHrEmail,
} = require("./emailTemplates");

const app = express();
const PORT = process.env.PORT || 5000;

const BRAND = "PFMC";
const FROM = `"PFMC - Prop Facility Management" <${process.env.EMAIL_USER}>`;

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// =====================================================
// GMAIL TRANSPORTER
// =====================================================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =====================================================
// STARTUP CHECK
// =====================================================

console.log(
  "📧 EMAIL_USER:",
  process.env.EMAIL_USER ? "✅ LOADED (" + process.env.EMAIL_USER + ")" : "❌ MISSING"
);
console.log(
  "🔑 EMAIL_PASS:",
  process.env.EMAIL_PASS
    ? "✅ LOADED (length: " + process.env.EMAIL_PASS.length + ")"
    : "❌ MISSING"
);
console.log(
  "📧 HR_EMAIL:",
  process.env.HR_EMAIL ? "✅ LOADED (" + process.env.HR_EMAIL + ")" : "❌ MISSING"
);

// =====================================================
// HOME / HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PFMC backend is running 🚀",
  });
});

// =====================================================
// TEST EMAIL
// =====================================================

app.get("/api/test-email", async (req, res) => {
  try {
    await transporter.sendMail({
      from: FROM,
      to: process.env.HR_EMAIL,
      subject: `${BRAND} Website - Test Email`,
      text: `Gmail integration with the ${BRAND} backend is working successfully.`,
    });

    console.log("✅ Test email sent successfully");

    res.json({ success: true, message: "Test email sent successfully" });
  } catch (error) {
    console.error("❌ Test email error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send test email",
      error: error.message,
    });
  }
});

// =====================================================
// CONTACT / ENQUIRY API
// =====================================================

app.post("/api/contact", async (req, res) => {
  try {
    const { fullName, company, email, phone, service, message } = req.body;

    console.log("\n📩 NEW CONTACT ENQUIRY");
    console.log({ fullName, company, email, phone, service });

    if (!fullName || !email || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // ---------- Email to HR ----------
    await transporter.sendMail({
      from: FROM,
      to: process.env.HR_EMAIL,
      replyTo: email,
      subject: `New ${BRAND} Website Enquiry - ${service}`,
      text: `
NEW ${BRAND} WEBSITE ENQUIRY
========================
Full Name: ${fullName}
Company: ${company || "Not provided"}
Email: ${email}
Phone: ${phone}
Service: ${service}

Message:
${message}
      `.trim(),
      html: contactHrEmail({ fullName, company, email, phone, service, message }),
    });

    console.log("✅ Contact enquiry sent to HR");

    // ---------- Confirmation to client ----------
    try {
      await transporter.sendMail({
        from: FROM,
        to: email,
        subject: `Thank you for contacting ${BRAND}`,
        text: `
Dear ${fullName},

Thank you for contacting ${BRAND}.
We have received your enquiry regarding: ${service}

Our team will review your requirements and get back to you shortly.

Regards,
Team ${BRAND}
        `.trim(),
        html: contactClientEmail({ fullName, service }),
      });

      console.log("✅ Customer confirmation email sent");
    } catch (confirmationError) {
      console.error("⚠️ Customer confirmation email failed:", confirmationError.message);
    }

    res.json({
      success: true,
      message: "Your enquiry has been sent successfully.",
    });
  } catch (error) {
    console.error("❌ Contact API error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send enquiry.",
      error: error.message,
    });
  }
});

// =====================================================
// CAREERS / JOB APPLICATION API
// =====================================================

app.post("/api/careers/apply", async (req, res) => {
  try {
    const { fullName, email, phone, position, experience, message } = req.body;

    console.log("\n💼 NEW CAREER APPLICATION");
    console.log({ fullName, email, phone, position, experience });

    if (!fullName || !email || !phone || !position) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // ---------- Email to HR ----------
    await transporter.sendMail({
      from: FROM,
      to: process.env.HR_EMAIL,
      replyTo: email,
      subject: `New ${BRAND} Job Application - ${position}`,
      text: `
NEW ${BRAND} JOB APPLICATION
========================
Position: ${position}
Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Experience: ${experience || "Not provided"}

Message:
${message || "Not provided"}
      `.trim(),
      html: careerHrEmail({ fullName, email, phone, position, experience, message }),
    });

    console.log("✅ Career application sent to HR");

    // ---------- Confirmation to applicant ----------
    try {
      await transporter.sendMail({
        from: FROM,
        to: email,
        subject: `${BRAND} - Application Received`,
        text: `
Dear ${fullName},

Thank you for applying to ${BRAND}.
We have received your application for: ${position}

Our HR team will review your profile and contact you if it matches our requirements.

Regards,
${BRAND} HR Team
        `.trim(),
        html: careerApplicantEmail({ fullName, position }),
      });

      console.log("✅ Applicant confirmation email sent");
    } catch (confirmationError) {
      console.error("⚠️ Applicant confirmation email failed:", confirmationError.message);
    }

    res.json({
      success: true,
      message: "Application submitted successfully.",
    });
  } catch (error) {
    console.error("❌ Careers API error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit application.",
      error: error.message,
    });
  }
});

// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// =====================================================
// SERVER
// =====================================================

app.listen(PORT, "0.0.0.0", () => {
  console.log("\n======================================");
  console.log("🚀 PFMC BACKEND STARTED");
  console.log("======================================");
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`📧 Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`💼 Careers API: http://localhost:${PORT}/api/careers/apply`);
  console.log(`🧪 Test Email: http://localhost:${PORT}/api/test-email`);
  console.log("======================================\n");
});