import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

import User from './src/models/User.js';

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@marcoindia.in';
    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        email: adminEmail,
        name: 'Admin',
        password: hashedPassword,
        isStaff: true,
        isActive: true
      });
      console.log('Admin user created: admin@marcoindia.in / admin123');
    } else {
      console.log('Admin user already exists');
    }

    await mongoose.disconnect();
    console.log('Seed complete');
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
