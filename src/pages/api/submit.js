import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { getOrderTotalQuantity, MAX_TRUSTED_ORDER_QUANTITY } from '@/utils/orderTracking';

export default async function handler(req, res) {
  if (req.method === 'HEAD') {
    await connectDB().catch(() => {});
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    name,
    phone,
    deliveryZone,
    address,
    items,
    totalPrice,
    shippingCharge,
    grandTotal,
    orderId,
    orderDate,
    submissionTime,
  } = req.body;

  if (!name || !phone || !deliveryZone || !address) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (!orderId) {
    return res.status(400).json({ message: 'Order ID is required' });
  }

  let itemsArray = [];
  try {
    itemsArray = typeof items === 'string' ? JSON.parse(items || '[]') : items || [];
  } catch {
    itemsArray = [];
  }

  try {
    await connectDB();

    await Order.create({
      name,
      phone,
      deliveryZone,
      address,
      items: typeof items === 'string' ? items : JSON.stringify(items),
      totalPrice: Number(totalPrice) || 0,
      shippingCharge: Number(shippingCharge) || 0,
      grandTotal: Number(grandTotal) || 0,
      orderId,
      orderDate: orderDate || new Date().toISOString(),
      submissionTime:
        submissionTime ||
        new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
      isSuspicious: getOrderTotalQuantity(itemsArray) > MAX_TRUSTED_ORDER_QUANTITY,
    });

    return res.status(200).json({
      message: 'Order submitted successfully',
      orderId,
    });
  } catch (error) {
    console.error('Order submission error:', error);

    if (error.code === 11000) {
      return res.status(409).json({ message: 'Duplicate order ID. Please try again.' });
    }

    return res.status(500).json({ message: 'Failed to submit order. Please try again.' });
  }
}
