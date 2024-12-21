// pages/api/send-certificate-email.ts

import { NextApiRequest, NextApiResponse } from 'next';
import emailjs from 'emailjs-com';

const sendCertificateEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email, certificateImage } = req.body;

      // Validate input data
      if (!email || !certificateImage) {
        return res.status(400).json({ error: 'Email and certificate image are required.' });
      }

      // Prepare the email template params
      const templateParams = {
        to_email: email,
        message: 'Here is your certificate.',
        certificate_image: certificateImage, // The certificate image as base64 string
      };

      // Send email using EmailJS
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;

      // Send email using EmailJS (replace with your service ID, template ID, and user ID)
      const response = await emailjs.send(serviceId, templateId, templateParams, userId);

      if (response.status === 200) {
        // Respond with success message
        res.status(200).json({ success: 'Certificate sent via email successfully!' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send certificate email.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default sendCertificateEmail;
