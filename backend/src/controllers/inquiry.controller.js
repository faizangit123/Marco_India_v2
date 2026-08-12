import { PrismaClient } from '@prisma/client';
import { sendInquiryNotification, sendInquiryConfirmation } from '../services/email.service.js';

const prisma = new PrismaClient();

export const listCreate = async (req, res, next) => {
  try {
    if (req.method === 'GET') {
      if (!req.user) return res.status(401).json({ detail: 'Authentication required' });

      if (req.user.isStaff) {
        const { service_type, status } = req.query;
        const where = {};
        if (service_type) where.serviceType = service_type;
        if (status) where.status = status;

        const inquiries = await prisma.inquiry.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          include: { user: true }
        });

        return res.json(inquiries.map(i => ({
          id: i.id,
          name: i.name,
          phone: i.phone,
          service_type: i.serviceType,
          status: i.status,
          admin_notes: i.adminNotes,
          user_email: i.user?.email,
          created_at: i.createdAt,
          updated_at: i.updatedAt
        })));
      } else {
        const inquiries = await prisma.inquiry.findMany({
          where: { userId: req.user.id },
          orderBy: { createdAt: 'desc' }
        });

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
      
      const inquiry = await prisma.inquiry.create({
        data: {
          name,
          phone,
          serviceType: service_type,
          userId: req.user ? req.user.id : null
        }
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
      const inquiry = await prisma.inquiry.findUnique({
        where: { id },
        include: { user: true }
      });
      if (!inquiry) return res.status(404).json({ detail: 'Not found.' });
      
      return res.json({
        id: inquiry.id,
        name: inquiry.name,
        phone: inquiry.phone,
        service_type: inquiry.serviceType,
        status: inquiry.status,
        admin_notes: inquiry.adminNotes,
        user_email: inquiry.user?.email,
        created_at: inquiry.createdAt,
        updated_at: inquiry.updatedAt
      });
    } else if (req.method === 'PATCH') {
      const { status, admin_notes } = req.body;
      const data = {};
      if (status) data.status = status;
      if (admin_notes !== undefined) data.adminNotes = admin_notes;

      const inquiry = await prisma.inquiry.update({
        where: { id },
        data,
        include: { user: true }
      });
      
      return res.json({
        id: inquiry.id,
        name: inquiry.name,
        phone: inquiry.phone,
        service_type: inquiry.serviceType,
        status: inquiry.status,
        admin_notes: inquiry.adminNotes,
        user_email: inquiry.user?.email,
        created_at: inquiry.createdAt,
        updated_at: inquiry.updatedAt
      });
    }
  } catch (error) {
    next(error);
  }
};
