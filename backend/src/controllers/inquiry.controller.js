import Inquiry from '../models/Inquiry.js';
import { sendInquiryNotification, sendInquiryConfirmation } from '../services/email.service.js';

export const listCreate = async (req, res, next) => {
  try {
    if (req.method === 'GET') {
      if (!req.user) return res.status(401).json({ detail: 'Authentication required' });

      if (req.user.isStaff) {
        const { service_type, status } = req.query;
        const where = {};
        if (service_type) where.serviceType = service_type;
        if (status) where.status = status;

        const inquiries = await Inquiry.find(where).sort({ createdAt: -1 }).populate('userId');

        return res.json(inquiries.map(i => ({
          id: i.id,
          name: i.name,
          phone: i.phone,
          service_type: i.serviceType,
          status: i.status,
          admin_notes: i.adminNotes,
          user_email: i.userId?.email,
          created_at: i.createdAt,
          updated_at: i.updatedAt
        })));
      } else {
        const inquiries = await Inquiry.find({ userId: req.user.id }).sort({ createdAt: -1 });

        return res.json(inquiries.map(i => ({
          id: i.id,
          name: i.name,
          phone: i.phone,
          service_type: i.serviceType,
          status: i.status,
          created_at: i.createdAt,
          updated_at: i.updatedAt
        })));
      }
    } else if (req.method === 'POST') {
      const { name, phone, service_type } = req.body;
      
      const inquiry = await Inquiry.create({
        name,
        phone,
        serviceType: service_type,
        userId: req.user ? req.user.id : null
      });

      sendInquiryNotification(inquiry).catch(console.error);
      if (req.user?.email) {
        sendInquiryConfirmation(req.user.email, name, service_type).catch(console.error);
      }

      res.status(201).json({
        id: inquiry.id,
        name: inquiry.name,
        phone: inquiry.phone,
        service_type: inquiry.serviceType,
        status: inquiry.status,
        created_at: inquiry.createdAt,
        updated_at: inquiry.updatedAt
      });
    }
  } catch (error) {
    next(error);
  }
};

export const detail = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (req.method === 'GET') {
      const inquiry = await Inquiry.findById(id).populate('userId');
      if (!inquiry) return res.status(404).json({ detail: 'Not found.' });
      
      return res.json({
        id: inquiry.id,
        name: inquiry.name,
        phone: inquiry.phone,
        service_type: inquiry.serviceType,
        status: inquiry.status,
        admin_notes: inquiry.adminNotes,
        user_email: inquiry.userId?.email,
        created_at: inquiry.createdAt,
        updated_at: inquiry.updatedAt
      });
    } else if (req.method === 'PATCH') {
      const { status, admin_notes } = req.body;
      const data = {};
      if (status) data.status = status;
      if (admin_notes !== undefined) data.adminNotes = admin_notes;

      const inquiry = await Inquiry.findByIdAndUpdate(id, data, { new: true }).populate('userId');
      
      return res.json({
        id: inquiry.id,
        name: inquiry.name,
        phone: inquiry.phone,
        service_type: inquiry.serviceType,
        status: inquiry.status,
        admin_notes: inquiry.adminNotes,
        user_email: inquiry.userId?.email,
        created_at: inquiry.createdAt,
        updated_at: inquiry.updatedAt
      });
    }
  } catch (error) {
    next(error);
  }
};
