import express, { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';

const router = express.Router();

// 🔐 Register - تۆمارکردنی کڕیاری نوێ
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { fullName, phone, email, password } = req.body;

    if (!fullName || !phone || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await prisma.user.findUnique({ where: { phone } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const passwordHash = await bcryptjs.hash(password, 10);
    const customerCode = `GC-${Math.floor(1000 + Math.random() * 9000)}`;

    // بەکارهێنەر + کڕیار پێکەوە دروست دەکرێن
    const user = await prisma.user.create({
      data: {
        fullName,
        phone,
        email: email || null,
        passwordHash,
        role: 'CUSTOMER',
        customer: {
          create: { customerCode },
        },
      },
      include: { customer: true },
    });

    res.status(201).json({
      message: 'User created successfully',
      userId: user.id,
      customerCode: user.customer?.customerCode,
    });
  } catch (error) {
    console.error('[auth/register]', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔑 Login - چوونەژوورەوە بە ژمارەی مۆبایل و وشەی نهێنی
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: 'Phone and password are required' });
    }

    const user = await prisma.user.findUnique({
      where: { phone },
      include: { customer: true },
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.status === 'BLOCKED') {
      return res.status(403).json({ message: 'Account is blocked' });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, phone: user.phone },
      process.env.JWT_SECRET || 'dev-secret-change-me',
      { expiresIn: '7d' }
    );

    // نوێکردنەوەی کاتی دوایین چوونەژوورەوە
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        customerCode: user.customer?.customerCode ?? null,
        name: user.fullName,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('[auth/login]', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔓 Logout
router.post('/logout', (_req: Request, res: Response) => {
  res.json({ message: 'Logout successful' });
});

export default router;
