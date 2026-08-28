import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import { config } from '../config/index.js';
import { verifyGoogleToken } from '../services/google.service.js';
import { sendPasswordResetEmail } from '../services/email.service.js';
import crypto from 'crypto';

const generateTokens = (user) => {
  const access = jwt.sign(
    { userId: user.id, email: user.email, isStaff: user.isStaff },
    config.jwt.secret,
    { expiresIn: '30m' }
  );
  
  const tokenId = crypto.randomBytes(16).toString('hex');
  const refresh = jwt.sign(
    { userId: user.id, tokenId },
    config.jwt.refreshSecret,
    { expiresIn: '7d' }
  );

  return { access, refresh, tokenId };
};

const MASTER_ADMIN_EMAILS = [
  'faizanrock705@gmail.com',
  'marcoindia890@gmail.com',
  'admin@marcoindia.in'
];

export const isMasterAdminEmail = (email) => {
  if (!email) return false;
  const emailLower = email.toLowerCase().trim();
  if (MASTER_ADMIN_EMAILS.includes(emailLower)) return true;
  if (config.email.adminEmails && config.email.adminEmails.map(e => e.toLowerCase().trim()).includes(emailLower)) return true;
  return false;
};

const formatUserResponse = (user) => {
  const isAdminEmail = isMasterAdminEmail(user?.email);
  const isStaff = Boolean(user?.isStaff || isAdminEmail);
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    avatar: user.avatar,
    is_staff: isStaff,
    isStaff: isStaff,
    isAdmin: isStaff,
    role: isStaff ? 'admin' : 'user',
    date_joined: user.dateJoined
  };
};

export const register = async (req, res, next) => {
  try {
    const { email, name, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ detail: 'User with this email already exists' });
    }

    const isAdminEmail = isMasterAdminEmail(email);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, name, phone, password: hashedPassword, isStaff: isAdminEmail
    });

    const { access, refresh, tokenId } = generateTokens(user);

    await RefreshToken.create({
      token: refresh,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    res.status(201).json({
      access,
      refresh,
      user: formatUserResponse(user)
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !user.isActive) {
      return res.status(401).json({ detail: 'No active account found with the given credentials' });
    }

    if (!user.password) {
      return res.status(401).json({ detail: 'Please login with Google' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ detail: 'No active account found with the given credentials' });
    }

    const isAdminEmail = isMasterAdminEmail(email);
    if (isAdminEmail && !user.isStaff) {
      user.isStaff = true;
      await user.save();
    }

    const { access, refresh, tokenId } = generateTokens(user);

    await RefreshToken.create({
      token: refresh,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    res.json({
      access,
      refresh,
      user: formatUserResponse(user)
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refresh } = req.body;
    if (refresh) {
      await RefreshToken.updateMany(
        { token: refresh, userId: req.user.id },
        { blacklisted: true }
      );
    }
    res.status(200).json({ detail: 'Successfully logged out' });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ detail: 'Credential is required' });
    }

    const { email, name, googleId, picture } = await verifyGoogleToken(credential);

    let user = await User.findOne({ email });
    const isAdminEmail = isMasterAdminEmail(email);
    
    if (user) {
      let updated = false;
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = user.avatar || picture;
        updated = true;
      }
      if (isAdminEmail && !user.isStaff) {
        user.isStaff = true;
        updated = true;
      }
      if (updated) {
        await user.save();
      }
    } else {
      user = await User.create({
        email, name, googleId, avatar: picture, password: '', isStaff: isAdminEmail
      });
    }

    if (!user.isActive) {
      return res.status(401).json({ detail: 'User is inactive' });
    }

    const { access, refresh, tokenId } = generateTokens(user);

    await RefreshToken.create({
      token: refresh,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    res.json({
      access,
      refresh,
      user: formatUserResponse(user)
    });
  } catch (error) {
    res.status(400).json({ detail: 'Invalid Google token' });
  }
};

export const getMe = async (req, res, next) => {
  try {
    let user = req.user;
    const isAdminEmail = isMasterAdminEmail(user?.email);
    if (isAdminEmail && !user.isStaff) {
      user.isStaff = true;
      await user.save();
    }
    res.json(formatUserResponse(user));
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    const data = {};
    if (name) data.name = name;
    if (phone !== undefined) data.phone = phone;
    
    if (req.file) {
      data.avatar = `/uploads/avatars/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.user.id, data, { new: true });

    res.json(formatUserResponse(user));
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { old_password, new_password } = req.body;
    
    const user = await User.findById(req.user.id);
    
    if (!user.password) {
      return res.status(400).json({ detail: 'Account created with Google, no password to change' });
    }

    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
      return res.status(400).json({ old_password: ['Wrong password'] });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    await User.findByIdAndUpdate(user.id, { password: hashedPassword });

    res.json({ detail: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};

export const passwordResetRequest = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (user && user.isActive) {
      const token = jwt.sign({ userId: user.id, type: 'reset' }, config.jwt.secret, { expiresIn: '1h' });
      const resetLink = `${config.frontendUrl}/reset-password?token=${token}`;
      await sendPasswordResetEmail(email, resetLink);
    }
    
    res.json({ detail: 'If the email exists, a reset link has been sent' });
  } catch (error) {
    next(error);
  }
};

export const passwordResetConfirm = async (req, res, next) => {
  try {
    const { token, new_password } = req.body;
    
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt.secret);
    } catch (err) {
      return res.status(400).json({ detail: 'Invalid or expired token' });
    }

    if (decoded.type !== 'reset') {
      return res.status(400).json({ detail: 'Invalid token type' });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    await User.findByIdAndUpdate(decoded.userId, { password: hashedPassword });

    res.json({ detail: 'Password has been reset' });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refresh } = req.body;
    if (!refresh) {
      return res.status(400).json({ detail: 'Refresh token is required' });
    }

    const tokenRecord = await RefreshToken.findOne({ token: refresh });
    if (!tokenRecord || tokenRecord.blacklisted || tokenRecord.expiresAt < new Date()) {
      return res.status(401).json({ detail: 'Token is invalid or expired' });
    }

    let decoded;
    try {
      decoded = jwt.verify(refresh, config.jwt.refreshSecret);
    } catch (err) {
      return res.status(401).json({ detail: 'Token is invalid or expired' });
    }

    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({ detail: 'User is inactive' });
    }

    await RefreshToken.findByIdAndUpdate(tokenRecord.id, { blacklisted: true });

    const newTokens = generateTokens(user);

    await RefreshToken.create({
      token: newTokens.refresh,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    res.json({
      access: newTokens.access,
      refresh: newTokens.refresh
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
