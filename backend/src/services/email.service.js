import nodemailer from 'nodemailer';
import { config } from '../config/index.js';

let transporter = null;

const isEmailConfigured = () => {
  return Boolean(config.email.host && config.email.user && config.email.password);
};

const getTransporter = () => {
  if (!transporter && isEmailConfigured()) {
    transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port || 587,
      secure: config.email.port === 465,
      auth: {
        user: config.email.user,
        pass: config.email.password
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 10000
    });
  }
  return transporter;
};

export const sendInquiryNotification = async (inquiryData) => {
  try {
    if (!config.email.adminEmails || config.email.adminEmails.length === 0) return;
    const client = getTransporter();
    if (!client) {
      console.log(`[EmailService] (Local/Mock) New Inquiry: ${inquiryData.name} - ${inquiryData.serviceType} (${inquiryData.phone})`);
      return;
    }
    
    await client.sendMail({
      from: config.email.from || `"Marco India" <${config.email.user}>`,
      to: config.email.adminEmails.join(','),
      subject: `New Service Inquiry: ${inquiryData.serviceType}`,
      text: `New inquiry received:\nName: ${inquiryData.name}\nPhone: ${inquiryData.phone}\nService: ${inquiryData.serviceType}\nNotes: ${inquiryData.notes || 'N/A'}`
    });
  } catch (error) {
    console.error('[EmailService] Failed to send inquiry notification email:', error.message);
  }
};

export const sendContactNotification = async (contactData) => {
  try {
    if (!config.email.adminEmails || config.email.adminEmails.length === 0) return;
    const client = getTransporter();
    if (!client) {
      console.log(`[EmailService] (Local/Mock) Contact Form: ${contactData.name} (${contactData.email}): ${contactData.message}`);
      return;
    }
    
    await client.sendMail({
      from: config.email.from || `"Marco India" <${config.email.user}>`,
      to: config.email.adminEmails.join(','),
      subject: `New Contact Form Submission from ${contactData.name}`,
      text: `Name: ${contactData.name}\nEmail: ${contactData.email}\nPhone: ${contactData.phone || 'N/A'}\nMessage: ${contactData.message}`
    });
  } catch (error) {
    console.error('[EmailService] Failed to send contact notification email:', error.message);
  }
};

export const sendInquiryConfirmation = async (email, name, serviceType) => {
  try {
    if (!email) return;
    const client = getTransporter();
    if (!client) return;

    await client.sendMail({
      from: config.email.from || `"Marco India" <${config.email.user}>`,
      to: email,
      subject: 'Marco India — We received your inquiry',
      text: `Hi ${name},\n\nThank you for contacting Marco India. We have received your inquiry regarding ${serviceType}.\n\nOur engineering team will review your requirements and get in touch with you shortly.\n\nWarm regards,\nMarco India Team`
    });
  } catch (error) {
    console.error('[EmailService] Failed to send confirmation email to client:', error.message);
  }
};

export const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    if (!email) return;
    const client = getTransporter();
    if (!client) {
      console.log(`[EmailService] (Local/Mock) Password Reset Link for ${email}: ${resetLink}`);
      return;
    }

    await client.sendMail({
      from: config.email.from || `"Marco India" <${config.email.user}>`,
      to: email,
      subject: 'Marco India — Reset Your Password',
      text: `Hello,\n\nYou requested a password reset for your Marco India account.\n\nPlease click the link below to set a new password:\n${resetLink}\n\nThis link will expire in 1 hour. If you did not request this, please ignore this email.\n\nWarm regards,\nMarco India Team`
    });
  } catch (error) {
    console.error('[EmailService] Failed to send password reset email:', error.message);
  }
};
