import express, { Request, Response } from 'express';
import Shipment from '../models/Shipment';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

// 📦 Get all shipments
router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const shipments = await Shipment.findAll();
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// 📦 Get shipment by ID
router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const shipment = await Shipment.findByPk(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// ➕ Create shipment
router.post('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const { trackingId, fromCountry, toCity, weight, volume, cargoCount, price, notes } = req.body;

    const shipment = await Shipment.create({
      trackingId,
      fromCountry,
      toCity,
      weight,
      volume,
      cargoCount,
      price,
      notes,
      userId: (req as any).userId
    });

    res.status(201).json({
      message: 'Shipment created successfully',
      shipment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// ✏️ Update shipment
router.put('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const shipment = await Shipment.findByPk(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    await shipment.update(req.body);
    res.json({
      message: 'Shipment updated successfully',
      shipment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// 🗑️ Delete shipment
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const shipment = await Shipment.findByPk(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    await shipment.destroy();
    res.json({ message: 'Shipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
