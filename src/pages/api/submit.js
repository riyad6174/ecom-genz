import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { getOrderTotalQuantity, MAX_TRUSTED_ORDER_QUANTITY } from '@/utils/orderTracking';
import { emptyFraudCheck, fetchCourierHistory, normalizePhoneForQC } from '@/lib/fraudChecker';

const clip = (v, max) => String(v || '').slice(0, max);

function phoneVariants(raw) {
  const set = new Set([String(raw)]);
  const local = normalizePhoneForQC(raw);
  if (local) {
    set.add(local);
    set.add(`880${local.slice(1)}`);
    set.add(`+880${local.slice(1)}`);
  }
  return [...set];
}

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
    userAgent,
    deviceType,
    deviceOS,
    browser,
    landingUrl,
    pageUrl,
    referrer,
    trafficSource,
    utmSource,
    utmMedium,
    utmCampaign,
    firstTouchSource,
    firstTouchUrl,
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

    // Repeat-customer hint; must never block the order if the lookup fails.
    let previousOrderCount = 0;
    try {
      previousOrderCount = await Order.countDocuments({ phone: { $in: phoneVariants(phone) } });
    } catch (err) {
      console.warn('Previous order lookup failed:', err?.message || err);
    }

    const created = await Order.create({
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
      fraudCheck: emptyFraudCheck(),
      qcStatus: 'pending',
      userAgent: clip(userAgent, 500),
      deviceType: clip(deviceType, 30),
      deviceOS: clip(deviceOS, 30),
      browser: clip(browser, 50),
      landingUrl: clip(landingUrl, 1000),
      pageUrl: clip(pageUrl, 1000),
      referrer: clip(referrer, 1000),
      trafficSource: clip(trafficSource, 50) || 'organic',
      utmSource: clip(utmSource, 200),
      utmMedium: clip(utmMedium, 200),
      utmCampaign: clip(utmCampaign, 200),
      firstTouchSource: clip(firstTouchSource, 50),
      firstTouchUrl: clip(firstTouchUrl, 1000),
      customerType: previousOrderCount > 0 ? 'repeat' : 'new',
      previousOrderCount,
    });

    // Courier-history check runs AFTER the order is saved; any failure here is
    // recorded on the order (retried by /api/cron/backfill-qc) and never affects the response.
    try {
      const qcData = await fetchCourierHistory(phone);
      if (qcData) {
        await Order.updateOne(
          { _id: created._id },
          { $set: { fraudCheck: qcData, qcStatus: 'ok', qcCheckedAt: new Date() } },
        );
      } else {
        const valid = !!normalizePhoneForQC(phone);
        await Order.updateOne(
          { _id: created._id },
          {
            $set: { qcStatus: valid ? 'failed' : 'skipped', qcCheckedAt: new Date() },
            $inc: { qcRetryCount: 1 },
          },
        );
      }
    } catch (qcError) {
      console.warn('QC step failed:', qcError?.message || qcError);
    }

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
