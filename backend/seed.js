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
    let existing = await User.findOne({ email: adminEmail });
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    if (!existing) {
      await User.create({
        email: adminEmail,
        name: 'Admin',
        password: hashedPassword,
        isStaff: true,
        isActive: true
      });
      console.log('Admin user created: admin@marcoindia.in / admin123');
    } else {
      existing.isStaff = true;
      existing.password = hashedPassword;
      await existing.save();
      console.log('Admin user updated: admin@marcoindia.in / admin123 (isStaff: true)');
    }

    await mongoose.disconnect();
    console.log('Seed complete');
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
