import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';

const router = express.Router();

// Middleware: پشتڕاستکردنەوەی token
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change-me');
    (req as any).user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// 📊 Dashboard stats - ئاماری داشبۆرد
router.get('/stats', requireAuth, async (_req: Request, res: Response) => {
  try {
    const [totalShipments, totalCustomers, delivered, pendingPayments] = await Promise.all([
      prisma.shipment.count(),
      prisma.customer.count(),
      prisma.shipment.count({ where: { status: 'DELIVERED' } }),
      prisma.payment.count({ where: { status: 'PENDING' } }),
    ]);

    const revenueAgg = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'PAID' },
    });

    res.json({
      totalShipments,
      totalCustomers,
      delivered,
      pendingPayments,
      totalRevenue: revenueAgg._sum.amount ?? 0,
    });
  } catch (error) {
    console.error('[shipments/stats]', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 📦 Get all shipments - لیستی بارەکان
router.get('/', requireAuth, async (_req: Request, res: Response) => {
  try {
    const shipments = await prisma.shipment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { customer: { include: { user: true } } },
    });
    res.json(shipments);
  } catch (error) {
    console.error('[shipments/list]', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 📦 Get shipment by ID
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: { id: req.params.id },
      include: { customer: true, cargoItems: true, trackingHistory: true },
    });
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }
    res.json(shipment);
  } catch (error) {
    console.error('[shipments/get]', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
