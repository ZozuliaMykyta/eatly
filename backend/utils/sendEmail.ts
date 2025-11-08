import nodemailer from "nodemailer";

const sendEmail = async (options: {
  email: string;
  subject: string;
  message: string;
}) => {
  // Try different SMTP configurations
  const configs = [
    // Gmail direct
    {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
    },
    // Gmail SSL
    {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
    },
    // Alternative port
    {
      host: "smtp.gmail.com",
      port: 25,
      secure: false,
    },
  ];

  let lastError;

  for (const config of configs) {
    try {
      console.log(
        `Trying SMTP config: ${config.host}:${config.port} (secure: ${config.secure})`
      );

      const transporter = nodemailer.createTransport({
        ...config,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 5000, // 5 seconds
        socketTimeout: 10000, // 10 seconds
      });

      const mailOptions = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
      };

      await transporter.sendMail(mailOptions);
      console.log(
        `✅ Email sent successfully using ${config.host}:${config.port}`
      );
      return; // Success, exit function
    } catch (error) {
      console.log(`❌ Failed with ${config.host}:${config.port}:`, error);
      lastError = error;
      continue; // Try next config
    }
  }

  // If all configs failed, throw the last error
  throw lastError || new Error("All SMTP configurations failed");
};

export default sendEmail;
