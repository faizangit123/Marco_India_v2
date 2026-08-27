import ContactMessage from '../models/ContactMessage.js';
import { sendContactNotification, sendContactConfirmation } from '../services/email.service.js';

const formatContact = (c) => ({
  id: c.id,
  name: c.name,
  email: c.email,
  phone: c.phone,
  service_type: c.serviceType,
  message: c.message,
  status: c.status,
  admin_notes: c.adminNotes,
  created_at: c.createdAt,
  updated_at: c.updatedAt
});

export const create = async (req, res, next) => {
  try {
    const { name, email, phone, service_type, message } = req.body;
    
    const contact = await ContactMessage.create({
      name, email, phone, serviceType: service_type, message
    });

    sendContactNotification(contact).catch(console.error);
    if (contact.email) {
      sendContactConfirmation(contact).catch(console.error);
    }

    res.status(201).json(formatContact(contact));
  } catch (error) {
    next(error);
  }
};

export const adminList = async (req, res, next) => {
  try {
    const contacts = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(contacts.map(formatContact));
  } catch (error) {
    next(error);
  }
};

export const adminDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (req.method === 'GET') {
      const contact = await ContactMessage.findById(id);
      if (!contact) return res.status(404).json({ detail: 'Not found.' });
      return res.json(formatContact(contact));
    } else if (req.method === 'PATCH') {
      const { status, admin_notes } = req.body;
      const data = {};
      if (status) data.status = status;
      if (admin_notes !== undefined) data.adminNotes = admin_notes;

      const contact = await ContactMessage.findByIdAndUpdate(id, data, { new: true });
      return res.json(formatContact(contact));
    } else if (req.method === 'DELETE') {
      await ContactMessage.findByIdAndDelete(id);
      return res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};
