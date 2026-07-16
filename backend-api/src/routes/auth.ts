import express, { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

// 🔐 Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, phone, email, password, location } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Generate customer code
    const customerCode = `GC-${Math.floor(Math.random() * 10000)}`;

    // Create user
    const user = await User.create({
      customerCode,
      name,
      phone,
      email,
      password: hashedPassword,
      location
    });

    res.status(201).json({
      message: 'User created successfully',
      userId: user.id,
      customerCode
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// 🔑 Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ where: { phone } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, phone: user.phone },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        customerCode: user.customerCode,
        name: user.name,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// 🔓 Logout
router.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logout successful' });
});

export default router;
