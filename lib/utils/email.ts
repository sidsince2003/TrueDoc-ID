import nodemailer from "nodemailer";

export const createEmailTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error("Missing email configuration");
  }

  return nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
  });
};

export const sendCertificateEmail = async (
  transporter: nodemailer.Transporter,
  { name, email, certificateImage }: { 
    name: string; 
    email: string; 
    certificateImage: string;
  }
) => {
  const base64Data = certificateImage.replace(/^data:image\/png;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  await transporter.sendMail({
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: "Your Verification Certificate",
    html: `
      <h1>Hello ${name},</h1>
      <p>Please find your verification certificate attached.</p>
      <p>Best regards,<br>${process.env.FROM_NAME} Team</p>
    `,
    attachments: [
      {
        filename: "certificate.png",
        content: buffer,
      },
    ],
  });
};