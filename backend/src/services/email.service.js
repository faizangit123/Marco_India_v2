import nodemailer from 'nodemailer';
import { config } from '../config/index.js';

let transporter = null;

const isEmailConfigured = () => {
  return Boolean(process.env.RESEND_API_KEY || (config.email.user && config.email.password));
};

const getTransporter = () => {
  if (!transporter && (config.email.user && config.email.password)) {
    const cleanPassword = (config.email.password || '').replace(/\s+/g, '');
    const isGmail = (config.email.host && config.email.host.includes('gmail')) || 
                    (config.email.user && config.email.user.includes('@gmail.com')) ||
                    (process.env.EMAIL_SERVICE && process.env.EMAIL_SERVICE.toLowerCase() === 'gmail');

    if (isGmail) {
      transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: config.email.user,
          pass: cleanPassword
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000
      });
    } else {
      const port = Number(config.email.port) || 465;
      transporter = nodemailer.createTransport({
        host: config.email.host,
        port: port,
        secure: port === 465,
        auth: {
          user: config.email.user,
          pass: cleanPassword
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000
      });
    }
  }
  return transporter;
};

// Unified sender: Uses Resend HTTPS API on Port 443 (which is never blocked on Render) or Nodemailer SMTP
export const sendEmailMessage = async ({ to, subject, text, html }) => {
  // 1. Primary Cloud Option: Resend HTTPS API (Port 443)
  if (process.env.RESEND_API_KEY) {
    const toList = Array.isArray(to) ? to : [to];
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'Marco India <onboarding@resend.dev>',
        to: toList,
        subject: subject,
        text: text,
        html: html
      })
    });
    
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return { success: true, provider: 'resend', id: data.id };
  }

  // 2. SMTP Transport
  const client = getTransporter();
  if (client) {
    const fromAddr = config.email.from || `"Marco India" <${config.email.user}>`;
    const toAddr = Array.isArray(to) ? to.join(',') : to;
    const info = await client.sendMail({
      from: fromAddr,
      to: toAddr,
      subject,
      text,
      html
    });
    return { success: true, provider: 'smtp', messageId: info.messageId };
  }

  throw new Error('No email service configured. Render Free Tier blocks direct SMTP (ports 25, 465, 587). Please provide RESEND_API_KEY.');
};

export const sendInquiryNotification = async (inquiryData) => {
  try {
    const recipients = config.email.adminEmails || ['faizanrock705@gmail.com', 'admin@marcoindia.in'];
    
    await sendEmailMessage({
      to: recipients,
      subject: `🚨 New Inquiry: ${inquiryData.serviceType} — ${inquiryData.name}`,
      text: `New service inquiry received:\n\nName: ${inquiryData.name}\nPhone: ${inquiryData.phone}\nService: ${inquiryData.serviceType}\nLocation: ${inquiryData.location || 'N/A'}\nNotes: ${inquiryData.notes || 'None'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5E2DB; border-radius: 12px; overflow: hidden;">
          <div style="background: #C75B2B; padding: 20px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">🚨 New Service Inquiry Received</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Marco India Portal Notification</p>
          </div>
          <div style="padding: 24px; background: #ffffff; color: #1A1A1A;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666; width: 140px;"><strong>Client Name:</strong></td><td style="padding: 8px 0; font-size: 16px;"><strong>${inquiryData.name}</strong></td></tr>
              <tr><td style="padding: 8px 0; color: #666;"><strong>Phone Number:</strong></td><td style="padding: 8px 0;"><a href="tel:${inquiryData.phone}" style="color: #C75B2B; font-weight: bold; text-decoration: none;">${inquiryData.phone}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;"><strong>Service Requested:</strong></td><td style="padding: 8px 0;">${inquiryData.serviceType}</td></tr>
              ${inquiryData.location ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Location:</strong></td><td style="padding: 8px 0;">${inquiryData.location}</td></tr>` : ''}
              ${inquiryData.notes ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Project Scope:</strong></td><td style="padding: 8px 0;">${inquiryData.notes}</td></tr>` : ''}
            </table>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #E5E2DB;" />
            <p style="margin: 0; font-size: 13px; color: #888;">You can manage and update this inquiry directly in the Marco India Admin Portal.</p>
          </div>
        </div>
      `
    });
    console.log(`[EmailService] Inquiry notification successfully sent to: ${recipients.join(', ')}`);
  } catch (error) {
    console.error('[EmailService] Failed to send inquiry email:', error.message);
  }
};

export const sendContactNotification = async (contactData) => {
  try {
    const recipients = config.email.adminEmails || ['faizanrock705@gmail.com', 'admin@marcoindia.in'];

    await sendEmailMessage({
      to: recipients,
      subject: `📩 New Contact Form Submission from ${contactData.name}`,
      text: `New contact form submission:\n\nName: ${contactData.name}\nEmail: ${contactData.email}\nPhone: ${contactData.phone || 'N/A'}\nService: ${contactData.serviceType || 'General'}\nMessage:\n${contactData.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5E2DB; border-radius: 12px; overflow: hidden;">
          <div style="background: #1A1A1A; padding: 20px; color: #ffffff; border-left: 5px solid #C75B2B;">
            <h2 style="margin: 0; font-size: 20px;">📩 New Contact Form Message</h2>
            <p style="margin: 5px 0 0 0; color: #C8C4BE;">From: ${contactData.name}</p>
          </div>
          <div style="padding: 24px; background: #ffffff; color: #1A1A1A;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666; width: 130px;"><strong>Name:</strong></td><td style="padding: 8px 0; font-weight: bold;">${contactData.name}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${contactData.email}" style="color: #C75B2B; text-decoration: none;">${contactData.email}</a></td></tr>
              ${contactData.phone ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td><td style="padding: 8px 0;"><a href="tel:${contactData.phone}" style="color: #C75B2B; text-decoration: none;">${contactData.phone}</a></td></tr>` : ''}
              ${contactData.serviceType ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Service:</strong></td><td style="padding: 8px 0;">${contactData.serviceType}</td></tr>` : ''}
            </table>
            <div style="margin: 18px 0; padding: 16px; background: #FAF8F5; border-left: 4px solid #C75B2B; border-radius: 6px;">
              <p style="margin: 0 0 6px 0; font-weight: bold; color: #555; font-size: 13px;">Message:</p>
              <p style="margin: 0; font-size: 15px; line-height: 1.5; color: #1A1A1A; white-space: pre-wrap;">${contactData.message}</p>
            </div>
            <p style="margin: 0; font-size: 13px; color: #888;">Reply directly to this email or contact the client via the details above.</p>
          </div>
        </div>
      `
    });
    console.log(`[EmailService] Contact notification successfully sent to: ${recipients.join(', ')}`);
  } catch (error) {
    console.error('[EmailService] Failed to send contact email:', error.message);
  }
};

export const sendContactConfirmation = async (contactData) => {
  try {
    if (!contactData.email) return;

    await sendEmailMessage({
      to: contactData.email,
      subject: 'Marco India — Thank you for reaching out',
      text: `Hi ${contactData.name},\n\nThank you for contacting Marco India. We have received your message regarding ${contactData.serviceType || 'our services'}.\n\nOur engineering team will review your message and get back to you shortly.\n\nWarm regards,\nMarco India Team\nPhone: +91 9315501070 / +91 8092099110\nWebsite: https://marcoindia.in`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5E2DB; border-radius: 12px; overflow: hidden;">
          <div style="background: #1A1A1A; padding: 24px; text-align: center; color: #ffffff;">
            <h2 style="margin: 0; font-size: 22px; color: #C75B2B;">MARCO INDIA</h2>
            <p style="margin: 6px 0 0 0; color: #C8C4BE; font-size: 14px;">Enterprise Infrastructure & Network Solutions</p>
          </div>
          <div style="padding: 24px; background: #ffffff; color: #1A1A1A;">
            <p style="font-size: 16px; margin-top: 0;">Hi <strong>${contactData.name}</strong>,</p>
            <p style="color: #444; line-height: 1.6;">Thank you for contacting Marco India. We have received your message and our team will get in touch with you shortly.</p>
            <div style="padding: 14px; background: #FAF8F5; border-radius: 8px; margin: 18px 0;">
              <p style="margin: 0; font-size: 14px; color: #666;"><strong>Need immediate assistance?</strong></p>
              <p style="margin: 6px 0 0 0; font-size: 15px; color: #C75B2B; font-weight: bold;">
                📞 +91 9315501070 &nbsp;|&nbsp; +91 8092099110
              </p>
            </div>
            <p style="margin: 0; font-size: 14px; color: #666;">Warm regards,<br><strong>Marco India Team</strong></p>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.error('[EmailService] Failed to send client confirmation email:', error.message);
  }
};

export const sendInquiryConfirmation = async (email, name, serviceType) => {
  try {
    if (!email) return;

    await sendEmailMessage({
      to: email,
      subject: 'Marco India — We received your service inquiry',
      text: `Hi ${name},\n\nThank you for contacting Marco India. We have received your inquiry regarding ${serviceType}.\n\nOur engineering team will review your requirements and get in touch with you shortly.\n\nWarm regards,\nMarco India Team\nPhone: +91 9315501070 / +91 8092099110`
    });
  } catch (error) {
    console.error('[EmailService] Failed to send confirmation email to client:', error.message);
  }
};

export const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    if (!email) return;

    await sendEmailMessage({
      to: email,
      subject: 'Marco India — Reset Your Password',
      text: `Hello,\n\nYou requested a password reset for your Marco India account.\n\nPlease click the link below to set a new password:\n${resetLink}\n\nThis link will expire in 1 hour. If you did not request this, please ignore this email.\n\nWarm regards,\nMarco India Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5E2DB; border-radius: 12px; overflow: hidden;">
          <div style="background: #1A1A1A; padding: 20px; color: #ffffff; text-align: center;">
            <h2 style="margin: 0; color: #C75B2B;">MARCO INDIA</h2>
          </div>
          <div style="padding: 24px; background: #ffffff;">
            <p style="font-size: 16px;">Hello,</p>
            <p style="color: #444;">We received a request to reset your password for your Marco India account.</p>
            <p style="text-align: center; margin: 24px 0;">
              <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background: #C75B2B; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold;">Reset Password</a>
            </p>
            <p style="font-size: 13px; color: #888;">This link will expire in 1 hour. If you did not request a password reset, you can safely ignore this email.</p>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.error('[EmailService] Failed to send password reset email:', error.message);
  }
};

export const verifyAndTestEmail = async (targetEmail = 'faizanrock705@gmail.com') => {
  const isResend = Boolean(process.env.RESEND_API_KEY);
  const isSmtp = Boolean(config.email.user && config.email.password);

  if (!isResend && !isSmtp) {
    return {
      success: false,
      status: 'MISSING_CREDENTIALS',
      message: 'No email service configured. Please set RESEND_API_KEY in Render Environment to bypass Render cloud SMTP port blocks.',
      hint: 'Get a free API key at https://resend.com (free 3,000 emails/month, 0 port blocks).'
    };
  }

  try {
    const result = await sendEmailMessage({
      to: targetEmail,
      subject: '✅ Marco India Email Test — Success!',
      text: 'If you are reading this email, your Marco India email service is 100% operational!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #2D7A4F; border-radius: 8px;">
          <h2 style="color: #2D7A4F; margin-top: 0;">✅ Email Service is 100% Operational!</h2>
          <p>This is a live test notification confirming that Marco India is successfully sending emails to <strong>${targetEmail}</strong> via <strong>${isResend ? 'Resend HTTPS API (Port 443)' : 'SMTP'}</strong>.</p>
          <p style="color: #666; font-size: 13px;">Timestamp: ${new Date().toISOString()}</p>
        </div>
      `
    });

    return {
      success: true,
      status: 'SENT_SUCCESSFULLY',
      provider: result.provider,
      recipient: targetEmail,
      details: result
    };
  } catch (error) {
    const isTimeout = error.message?.includes('ETIMEDOUT') || error.code === 'ETIMEDOUT';
    return {
      success: false,
      status: isTimeout ? 'SMTP_BLOCKED_BY_RENDER' : 'SEND_FAILED',
      error: error.message,
      code: error.code,
      hint: isTimeout 
        ? 'Render Free Tier blocks raw SMTP ports (25, 465, 587). The standard fix on Render is to add RESEND_API_KEY (from resend.com) which sends via HTTPS port 443 without port restrictions.'
        : error.message
    };
  }
};
