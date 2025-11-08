import sgMail from "@sendgrid/mail";

const sendEmail = async (options: {
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    // Use SendGrid API if available
    if (process.env.SENDGRID_API_KEY) {
      console.log("📧 Using SendGrid API to send email");

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: options.email,
        from: process.env.FROM_EMAIL || "noreply@eatly.com",
        subject: options.subject,
        text: options.message,
        html: `<p>${options.message.replace(/\n/g, "<br>")}</p>`,
      };

      await sgMail.send(msg);
      console.log("✅ Email sent successfully via SendGrid");
      return;
    }

    // Fallback to SMTP (probably won't work on Render)
    console.log("⚠️ SendGrid not configured, falling back to SMTP");
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully via SMTP");
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
};

export default sendEmail;
