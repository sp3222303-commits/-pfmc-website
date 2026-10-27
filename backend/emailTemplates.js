// =====================================================
// PFMC - PROP FACILITY MANAGEMENT COMPANY
// emailTemplates.js - White & Red branded email designs
// =====================================================

const C = {
  red: "#D90D1E",
  redDark: "#B00A18",
  redSoft: "#FDECEE",
  dark: "#111111",
  text: "#3A3A42",
  muted: "#8A8A94",
  line: "#ECECEF",
  bg: "#F4F4F7",
  card: "#FFFFFF",
};

const FONT = "'Segoe UI', Helvetica, Arial, sans-serif";

// Escape user input so nobody can inject HTML into our emails
const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// -----------------------------------------------------
// Small building blocks
// -----------------------------------------------------

function detailsTable(rows) {
  const html = rows
    .filter(([, value]) => value)
    .map(([label, value, link], i, arr) => {
      const border =
        i === arr.length - 1 ? "" : `border-bottom:1px solid ${C.line};`;
      const display = link
        ? `<a href="${esc(link)}" style="color:${C.red};text-decoration:none;font-weight:600;">${esc(value)}</a>`
        : esc(value);
      return `
        <tr>
          <td style="padding:14px 18px;${border}width:150px;font-size:14px;color:${C.muted};vertical-align:top;">
            ${esc(label)}:
          </td>
          <td style="padding:14px 18px;${border}font-size:15px;color:${C.dark};font-weight:700;vertical-align:top;">
            ${display}
          </td>
        </tr>`;
    })
    .join("");

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
      style="background:#FAFAFB;border:1px solid ${C.line};border-left:4px solid ${C.red};border-radius:14px;border-collapse:separate;overflow:hidden;margin:6px 0 22px;">
      ${html}
    </table>`;
}

function messageBox(title, text) {
  return `
    <p style="margin:0 0 8px;font-size:12px;letter-spacing:.8px;text-transform:uppercase;color:${C.muted};font-weight:700;">
      ${esc(title)}
    </p>
    <div style="background:${C.redSoft};border-left:4px solid ${C.red};border-radius:10px;padding:16px 18px;font-size:15px;line-height:1.7;color:${C.dark};white-space:pre-wrap;">${esc(text)}</div>`;
}

function button(label, href, filled = true) {
  const style = filled
    ? `background:${C.red};color:#ffffff;border:2px solid ${C.red};`
    : `background:#ffffff;color:${C.red};border:2px solid ${C.red};`;
  return `<a href="${esc(href)}" style="display:inline-block;${style}padding:12px 26px;border-radius:999px;font-size:14px;font-weight:700;text-decoration:none;margin:4px 6px 4px 0;">${esc(label)}</a>`;
}

function servicesChips() {
  const list = [
    "Property Management",
    "Smart Facility Solutions",
    "Security Management",
    "Soft Services",
    "Business Support",
  ];
  const chips = list
    .map(
      (s) =>
        `<span style="display:inline-block;background:#ffffff;border:1px solid ${C.red};color:${C.red};font-size:12px;font-weight:700;padding:7px 14px;border-radius:999px;margin:0 6px 8px 0;">${esc(s)}</span>`
    )
    .join("");
  return `
    <p style="margin:26px 0 10px;font-size:13px;letter-spacing:.8px;text-transform:uppercase;color:${C.red};font-weight:800;">Our services</p>
    <div>${chips}</div>`;
}

function whatsappButton() {
  const num = String(process.env.WHATSAPP_NUMBER || "").replace(/\D/g, "");
  if (!num) return "";
  return button("Chat on WhatsApp", `https://wa.me/${num}`);
}

function steps(list) {
  return list
    .map(
      (text, i) => `
      <tr>
        <td style="width:40px;vertical-align:top;padding:8px 0;">
          <div style="width:28px;height:28px;border-radius:50%;background:${C.red};color:#fff;font-size:13px;font-weight:700;line-height:28px;text-align:center;">${i + 1}</div>
        </td>
        <td style="padding:8px 0 8px 4px;font-size:15px;line-height:1.6;color:${C.text};vertical-align:top;">${esc(text)}</td>
      </tr>`
    )
    .join("");
}

// -----------------------------------------------------
// Main layout (header + footer shared by all emails)
// -----------------------------------------------------

function layout({ preheader, badge, title, intro, content }) {
  const site = process.env.SITE_URL || "";
  const phone = process.env.COMPANY_PHONE || "";

  const footerLinks = [
    site ? `<a href="${esc(site)}" style="color:#ffffff;text-decoration:underline;font-weight:700;">${esc(site.replace(/^https?:\/\//, ""))}</a>` : "",
    phone ? `<a href="tel:${esc(phone)}" style="color:#ffffff;text-decoration:underline;font-weight:700;">${esc(phone)}</a>` : "",
  ]
    .filter(Boolean)
    .join(" &nbsp;•&nbsp; ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};font-family:${FONT};">

  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${esc(preheader)}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};padding:32px 12px;">
    <tr>
      <td align="center">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0"
          style="max-width:600px;width:100%;background:${C.card};border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(17,17,17,0.08);">

          <!-- Red gradient banner -->
          <tr>
            <td align="center" bgcolor="${C.red}" style="background:${C.red};background-image:linear-gradient(135deg,${C.redDark} 0%,${C.red} 55%,#FF3B47 100%);padding:38px 36px;text-align:center;">
              <div style="font-size:34px;font-weight:900;color:#ffffff;letter-spacing:6px;line-height:1;">PFMC</div>
              <div style="font-size:11px;letter-spacing:2.4px;color:#FFE3E5;margin-top:10px;font-weight:700;">PROP FACILITY MANAGEMENT COMPANY</div>
              <div style="font-size:14px;color:#ffffff;margin-top:8px;opacity:.92;">Integrated Property &amp; Facility Management</div>
            </td>
          </tr>

          <!-- Trust strip -->
          <tr>
            <td align="center" style="background:${C.redSoft};padding:13px 16px;text-align:center;font-size:12px;font-weight:700;color:${C.redDark};letter-spacing:.4px;">
              ✔ Integrated Solutions &nbsp;&nbsp;•&nbsp;&nbsp; ✔ Technology Driven &nbsp;&nbsp;•&nbsp;&nbsp; ✔ 24/7 Support
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style="padding:30px 36px 6px;">
              <span style="display:inline-block;background:${C.redSoft};color:${C.red};font-size:11px;font-weight:800;letter-spacing:1.4px;padding:7px 14px;border-radius:999px;">
                ● ${esc(badge)}
              </span>
              <h1 style="margin:18px 0 10px;font-size:30px;line-height:1.2;color:${C.dark};font-weight:800;">
                ${title}
              </h1>
              <div style="width:70px;height:4px;background:${C.red};border-radius:4px;opacity:.85;"></div>
              <p style="margin:18px 0 0;font-size:16px;line-height:1.7;color:${C.text};">
                ${intro}
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:22px 36px 34px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" bgcolor="${C.red}" style="background:${C.red};background-image:linear-gradient(135deg,${C.redDark} 0%,${C.red} 100%);padding:28px 36px;text-align:center;">
              <div style="font-size:16px;font-weight:800;color:#ffffff;letter-spacing:.6px;">
                Managing Spaces. Enabling Excellence.
              </div>
              ${footerLinks ? `<div style="font-size:13px;margin-top:10px;">${footerLinks}</div>` : ""}
              <div style="font-size:11px;color:#FFE3E5;margin-top:12px;line-height:1.6;">
                &copy; ${new Date().getFullYear()} PFMC - Prop Facility Management Company.<br />
                Integrated Property &amp; Facility Management.
              </div>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

// =====================================================
// 1) CONTACT - email to CLIENT
// =====================================================

function contactClientEmail({ fullName, service }) {
  const first = esc(String(fullName).trim().split(" ")[0]);

  return layout({
    preheader: "We have received your enquiry. Our team will contact you shortly.",
    badge: "ENQUIRY RECEIVED",
    title: `Thank you, <span style="color:${C.red};">${first}!</span>`,
    intro:
      "We have received your enquiry and our team is already reviewing your requirements.",
    content: `
      ${detailsTable([["Service", service]])}

      <p style="margin:0 0 6px;font-size:13px;letter-spacing:.8px;text-transform:uppercase;color:${C.red};font-weight:800;">What happens next</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:22px;">
        ${steps([
          "Our team reviews your requirements.",
          "A PFMC specialist contacts you by phone or email.",
          "We share a tailored solution and proposal.",
        ])}
      </table>

      ${servicesChips()}

      <p style="margin:22px 0 14px;font-size:15px;line-height:1.7;color:${C.text};">
        Need help urgently? Simply reply to this email.
      </p>
      ${whatsappButton()}

      <p style="margin:24px 0 0;font-size:15px;color:${C.text};line-height:1.6;">
        Warm regards,<br />
        <strong style="color:${C.dark};">Team PFMC</strong>
      </p>`,
  });
}

// =====================================================
// 2) CONTACT - email to HR / TEAM
// =====================================================

function contactHrEmail({ fullName, company, email, phone, service, message }) {
  return layout({
    preheader: `New enquiry from ${fullName} - ${service}`,
    badge: "NEW ENQUIRY",
    title: `New website <span style="color:${C.red};">enquiry</span>`,
    intro: `<strong style="color:${C.dark};">${esc(fullName)}</strong> has submitted an enquiry through the PFMC website.`,
    content: `
      ${detailsTable([
        ["Full Name", fullName],
        ["Company", company || "Not provided"],
        ["Email", email, `mailto:${email}`],
        ["Phone", phone, `tel:${phone}`],
        ["Service", service],
      ])}

      ${messageBox("Message", message)}

      <div style="margin-top:26px;">
        ${button("Reply to " + String(fullName).split(" ")[0], `mailto:${email}`)}
        ${button("Call now", `tel:${phone}`, false)}
      </div>`,
  });
}

// =====================================================
// 3) CAREERS - email to APPLICANT
// =====================================================

function careerApplicantEmail({ fullName, position }) {
  const first = esc(String(fullName).trim().split(" ")[0]);

  return layout({
    preheader: `Your application for ${position} has been received.`,
    badge: "APPLICATION RECEIVED",
    title: `Thanks for applying, <span style="color:${C.red};">${first}!</span>`,
    intro:
      "We have successfully received your application. We appreciate your interest in building a career with PFMC.",
    content: `
      ${detailsTable([["Position", position]])}

      <p style="margin:0 0 6px;font-size:13px;letter-spacing:.8px;text-transform:uppercase;color:${C.red};font-weight:800;">What happens next</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:22px;">
        ${steps([
          "Our HR team reviews your profile.",
          "If your profile matches, we will contact you for the next steps.",
          "Shortlisted candidates are invited for an interview.",
        ])}
      </table>

      <p style="margin:24px 0 0;font-size:15px;color:${C.text};line-height:1.6;">
        Best wishes,<br />
        <strong style="color:${C.dark};">PFMC HR Team</strong>
      </p>`,
  });
}

// =====================================================
// 4) CAREERS - email to HR
// =====================================================

function careerHrEmail({ fullName, email, phone, position, experience, message }) {
  return layout({
    preheader: `New application for ${position} from ${fullName}`,
    badge: "NEW APPLICATION",
    title: `New job <span style="color:${C.red};">application</span>`,
    intro: `<strong style="color:${C.dark};">${esc(fullName)}</strong> has applied through the PFMC Careers page.`,
    content: `
      ${detailsTable([
        ["Position", position],
        ["Full Name", fullName],
        ["Email", email, `mailto:${email}`],
        ["Phone", phone, `tel:${phone}`],
        ["Experience", experience || "Not provided"],
      ])}

      ${messageBox("Why do you want to join PFMC?", message || "Not provided")}

      <div style="margin-top:26px;">
        ${button("Reply to " + String(fullName).split(" ")[0], `mailto:${email}`)}
        ${button("Call now", `tel:${phone}`, false)}
      </div>`,
  });
}

module.exports = {
  contactClientEmail,
  contactHrEmail,
  careerApplicantEmail,
  careerHrEmail,
};