// =====================================================
// SMART PROPERTY AND FACILITY SERVICES PRIVATE LIMITED
// BACKEND - index.js
// Contact Enquiry + Careers Application + Gmail
// =====================================================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const COMPANY_NAME =
  "SMART PROPERTY AND FACILITY SERVICES PRIVATE LIMITED";

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
  process.env.EMAIL_USER
    ? "✅ LOADED (" + process.env.EMAIL_USER + ")"
    : "❌ MISSING"
);

console.log(
  "🔑 EMAIL_PASS:",
  process.env.EMAIL_PASS
    ? "✅ LOADED (length: " + process.env.EMAIL_PASS.length + ")"
    : "❌ MISSING"
);

console.log(
  "📧 HR_EMAIL:",
  process.env.HR_EMAIL
    ? "✅ LOADED (" + process.env.HR_EMAIL + ")"
    : "❌ MISSING"
);

// =====================================================
// HOME / HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "SMART PROPERTY AND FACILITY SERVICES PRIVATE LIMITED backend is running 🚀",
  });
});

// =====================================================
// TEST EMAIL
// =====================================================

app.get("/api/test-email", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.HR_EMAIL,

      subject: `${COMPANY_NAME} Website - Test Email`,

      text: `
Congratulations!

Gmail integration with the ${COMPANY_NAME} backend is working successfully.

This is a test email from the ${COMPANY_NAME} website.
      `.trim(),
    });

    console.log("✅ Test email sent successfully");

    res.json({
      success: true,
      message: "Test email sent successfully",
    });
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
    const {
      fullName,
      company,
      email,
      phone,
      service,
      message,
    } = req.body;

    console.log("");
    console.log("📩 ================================");
    console.log("📩 NEW CONTACT ENQUIRY");
    console.log("📩 ================================");

    console.log({
      fullName,
      company,
      email,
      phone,
      service,
    });

    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

    if (!fullName || !email || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // -------------------------------------------------
    // EMAIL TO HR
    // -------------------------------------------------

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.HR_EMAIL,

      replyTo: email,

      subject: `New ${COMPANY_NAME} Website Enquiry - ${service}`,

      text: `
NEW ${COMPANY_NAME.toUpperCase()} WEBSITE ENQUIRY
========================

Full Name:
${fullName}

Company:
${company || "Not provided"}

Business Email:
${email}

Phone Number:
${phone}

Service Required:
${service}

Message:
${message}

========================

This enquiry was submitted through the ${COMPANY_NAME} website.
      `.trim(),

      html: `
        <div style="
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #222;
          max-width: 750px;
          margin: auto;
        ">

          <h2 style="color: #111;">
            New ${COMPANY_NAME} Website Enquiry
          </h2>

          <p>
            A new enquiry has been submitted through the ${COMPANY_NAME} website.
          </p>

          <hr />

          <table
            cellpadding="8"
            cellspacing="0"
            style="
              border-collapse: collapse;
              width: 100%;
            "
          >

            <tr>
              <td style="font-weight: bold; width: 180px;">
                Full Name
              </td>
              <td>
                ${fullName}
              </td>
            </tr>

            <tr>
              <td style="font-weight: bold;">
                Company
              </td>
              <td>
                ${company || "Not provided"}
              </td>
            </tr>

            <tr>
              <td style="font-weight: bold;">
                Business Email
              </td>
              <td>
                ${email}
              </td>
            </tr>

            <tr>
              <td style="font-weight: bold;">
                Phone Number
              </td>
              <td>
                ${phone}
              </td>
            </tr>

            <tr>
              <td style="font-weight: bold;">
                Service Required
              </td>
              <td>
                ${service}
              </td>
            </tr>

          </table>

          <h3>
            Message
          </h3>

          <div style="
            background: #f5f5f5;
            padding: 15px;
            border-radius: 8px;
            white-space: pre-wrap;
          ">
            ${message}
          </div>

          <hr />

          <p style="
            font-size: 12px;
            color: #777;
          ">
            This enquiry was submitted through the ${COMPANY_NAME} website.
          </p>

        </div>
      `,
    });

    console.log("✅ Contact enquiry sent to HR");

    // -------------------------------------------------
    // CONFIRMATION EMAIL TO CUSTOMER
    // -------------------------------------------------

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,

        subject: `Thank You for Contacting ${COMPANY_NAME}`,

        text: `
Dear ${fullName},

Thank you for contacting ${COMPANY_NAME}.

We have successfully received your enquiry regarding:

${service}

Our team will review your requirements and get back to you shortly.

Regards,
${COMPANY_NAME} Team
        `.trim(),

        html: `
          <div style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #222;
          ">

            <h2>
              Thank You for Contacting ${COMPANY_NAME}
            </h2>

            <p>
              Dear ${fullName},
            </p>

            <p>
              Thank you for contacting ${COMPANY_NAME}.
              We have successfully received your enquiry.
            </p>

            <p>
              <strong>Service:</strong>
              ${service}
            </p>

            <p>
              Our team will review your requirements
              and get back to you shortly.
            </p>

            <br />

            <p>
              Regards,<br />
              <strong>${COMPANY_NAME} Team</strong>
            </p>

          </div>
        `,
      });

      console.log("✅ Customer confirmation email sent");
    } catch (confirmationError) {
      console.error(
        "⚠️ Customer confirmation email failed:",
        confirmationError.message
      );
    }

    // -------------------------------------------------
    // SUCCESS
    // -------------------------------------------------

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
    const {
      fullName,
      email,
      phone,
      position,
      experience,
      message,
    } = req.body;

    console.log("");
    console.log("💼 ================================");
    console.log("💼 NEW CAREER APPLICATION");
    console.log("💼 ================================");

    console.log({
      fullName,
      email,
      phone,
      position,
      experience,
    });

    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

    if (!fullName || !email || !phone || !position) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // -------------------------------------------------
    // EMAIL APPLICATION TO HR
    // -------------------------------------------------

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.HR_EMAIL,

      replyTo: email,

      subject: `New ${COMPANY_NAME} Job Application - ${position}`,

      text: `
NEW ${COMPANY_NAME.toUpperCase()} JOB APPLICATION
========================

Position Applied For:
${position}

Full Name:
${fullName}

Email:
${email}

Phone:
${phone}

Experience:
${experience || "Not provided"}

Message:
${message || "Not provided"}

========================

This application was submitted through the ${COMPANY_NAME} Careers page.
      `.trim(),

      html: `
        <div style="
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #222;
          max-width: 750px;
          margin: auto;
        ">

          <h2 style="color: #111;">
            New ${COMPANY_NAME} Job Application
          </h2>

          <p>
            A new job application has been submitted
            through the ${COMPANY_NAME} Careers page.
          </p>

          <hr />

          <table
            cellpadding="8"
            cellspacing="0"
            style="
              border-collapse: collapse;
              width: 100%;
            "
          >

            <tr>
              <td style="
                font-weight: bold;
                width: 180px;
              ">
                Position
              </td>

              <td>
                ${position}
              </td>
            </tr>

            <tr>
              <td style="font-weight: bold;">
                Full Name
              </td>

              <td>
                ${fullName}
              </td>
            </tr>

            <tr>
              <td style="font-weight: bold;">
                Email
              </td>

              <td>
                ${email}
              </td>
            </tr>

            <tr>
              <td style="font-weight: bold;">
                Phone
              </td>

              <td>
                ${phone}
              </td>
            </tr>

            <tr>
              <td style="font-weight: bold;">
                Experience
              </td>

              <td>
                ${experience || "Not provided"}
              </td>
            </tr>

          </table>

          <h3>
            Why do you want to join ${COMPANY_NAME}?
          </h3>

          <div style="
            background: #f5f5f5;
            padding: 15px;
            border-radius: 8px;
            white-space: pre-wrap;
          ">
            ${message || "Not provided"}
          </div>

          <hr />

          <p style="
            font-size: 12px;
            color: #777;
          ">
            This application was submitted through the ${COMPANY_NAME} Careers page.
          </p>

        </div>
      `,
    });

    console.log("✅ Career application sent to HR");

    // -------------------------------------------------
    // CONFIRMATION EMAIL TO APPLICANT
    // -------------------------------------------------

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,

        subject: `${COMPANY_NAME} - Application Received`,

        text: `
Dear ${fullName},

Thank you for applying to ${COMPANY_NAME}.

We have successfully received your application for:

${position}

Our HR team will review your application and contact you if your profile matches our requirements.

Regards,
${COMPANY_NAME} HR Team
        `.trim(),

        html: `
          <div style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #222;
          ">

            <h2>
              Application Received - ${COMPANY_NAME}
            </h2>

            <p>
              Dear ${fullName},
            </p>

            <p>
              Thank you for applying to ${COMPANY_NAME}.
              We have successfully received your application.
            </p>

            <p>
              <strong>
                Position Applied For:
              </strong>

              ${position}
            </p>

            <p>
              Our HR team will review your application
              and contact you if your profile matches
              our requirements.
            </p>

            <br />

            <p>
              Regards,<br />
              <strong>${COMPANY_NAME} HR Team</strong>
            </p>

          </div>
        `,
      });

      console.log("✅ Applicant confirmation email sent");

    } catch (confirmationError) {
      console.error(
        "⚠️ Applicant confirmation email failed:",
        confirmationError.message
      );
    }

    // -------------------------------------------------
    // SUCCESS RESPONSE
    // -------------------------------------------------

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

  console.log("");
  console.log("======================================");
  console.log(
    "🚀 SMART PROPERTY AND FACILITY SERVICES PRIVATE LIMITED BACKEND STARTED"
  );
  console.log("======================================");

  console.log(`🌐 Server: http://localhost:${PORT}`);

  console.log(
    `📧 Contact API: http://localhost:${PORT}/api/contact`
  );

  console.log(
    `💼 Careers API: http://localhost:${PORT}/api/careers/apply`
  );

  console.log(
    `🧪 Test Email: http://localhost:${PORT}/api/test-email`
  );

  console.log("======================================");
  console.log("");
});