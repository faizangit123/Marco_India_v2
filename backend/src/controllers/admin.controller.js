import User from '../models/User.js';
import Inquiry from '../models/Inquiry.js';
import GalleryItem from '../models/GalleryItem.js';
import Comment from '../models/Comment.js';
import ContactMessage from '../models/ContactMessage.js';
import Testimonial from '../models/Testimonial.js';

export const getStats = async (req, res, next) => {
  try {
    const [totalInquiries, pendingRequests, totalUsers, galleryItems, totalComments, totalContacts, totalTestimonials] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'submitted' }),
      User.countDocuments(),
      GalleryItem.countDocuments(),
      Comment.countDocuments(),
      ContactMessage.countDocuments(),
      Testimonial.countDocuments()
    ]);

    const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5);

    const recentContacts = await ContactMessage.find().sort({ createdAt: -1 }).limit(5);

    // Mock chart data for last 6 months to match Django logic or generate simple mock
    const chartData = [
      { month: 'Jan', inquiries: 5, contacts: 3, users: 2 },
      { month: 'Feb', inquiries: 7, contacts: 4, users: 3 },
      { month: 'Mar', inquiries: 10, contacts: 5, users: 4 },
      { month: 'Apr', inquiries: 12, contacts: 6, users: 5 },
      { month: 'May', inquiries: 15, contacts: 8, users: 7 },
      { month: 'Jun', inquiries: 20, contacts: 10, users: 10 },
    ];

    res.json({
      total_inquiries: totalInquiries,
      pending_requests: pendingRequests,
      total_users: totalUsers,
      gallery_items: galleryItems,
      total_comments: totalComments,
      total_contacts: totalContacts,
      total_testimonials: totalTestimonials,
      chart_data: chartData,
      recent_inquiries: recentInquiries.map(i => ({
        id: i.id, name: i.name, phone: i.phone, service_type: i.serviceType, status: i.status, created_at: i.createdAt
      })),
      recent_contacts: recentContacts.map(c => ({
        id: c.id, name: c.name, email: c.email, service_type: c.serviceType, status: c.status, created_at: c.createdAt
      }))
    });
  } catch (error) {
    next(error);
  }
};

export const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ dateJoined: -1 });
    res.json(users.map(u => ({
      id: u.id, email: u.email, name: u.name, phone: u.phone, is_staff: u.isStaff, is_active: u.isActive, date_joined: u.dateJoined
    })));
  } catch (error) {
    next(error);
  }
};

export const userDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (req.method === 'GET') {
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ detail: 'Not found.' });
      return res.json({
        id: user.id, email: user.email, name: user.name, phone: user.phone, is_staff: user.isStaff, is_active: user.isActive, date_joined: user.dateJoined
      });
    } else if (req.method === 'PATCH') {
      const { is_staff, is_active } = req.body;
      const data = {};
      if (is_staff !== undefined) data.isStaff = is_staff;
      if (is_active !== undefined) data.isActive = is_active;
      
      const user = await User.findByIdAndUpdate(id, data, { new: true });
      return res.json({
        id: user.id, email: user.email, name: user.name, phone: user.phone, is_staff: user.isStaff, is_active: user.isActive, date_joined: user.dateJoined
      });
    } else if (req.method === 'DELETE') {
      await User.findByIdAndDelete(id);
      return res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};
