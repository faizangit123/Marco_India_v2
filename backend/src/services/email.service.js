import nodemailer from 'nodemailer';
import { config } from '../config/index.js';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
});

export const sendInquiryNotification = async (inquiryData) => {
  if (config.email.adminEmails.length === 0) return;
  
  await transporter.sendMail({
    from: config.email.from,
    to: config.email.adminEmails.join(','),
    subject: `New Inquiry: ${inquiryData.serviceType}`,
    text: `New inquiry received:\nName: ${inquiryData.name}\nPhone: ${inquiryData.phone}\nService: ${inquiryData.serviceType}`
  });
};

export const sendContactNotification = async (contactData) => {
  if (config.email.adminEmails.length === 0) return;
  
  await transporter.sendMail({
    from: config.email.from,
    to: config.email.adminEmails.join(','),
    subject: `New Contact Form Submission`,
    text: `Name: ${contactData.name}\nEmail: ${contactData.email}\nMessage: ${contactData.message}`
  });
};

export const sendInquiryConfirmation = async (email, name, serviceType) => {
  if (!email) return;
  await transporter.sendMail({
    from: config.email.from,
    to: email,
    subject: 'We received your inquiry',
    text: `Hi ${name},\nWe have received your inquiry for ${serviceType}. We will get back to you shortly.`
  });
};

export const sendPasswordResetEmail = async (email, resetLink) => {
  await transporter.sendMail({
    from: config.email.from,
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${resetLink}`
  });
};
