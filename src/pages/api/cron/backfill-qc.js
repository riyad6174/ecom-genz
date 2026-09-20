import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { fetchCourierHistory, normalizePhoneForQC } from '@/lib/fraudChecker';

// Safety net for orders whose inline QC failed/timed out during /api/submit.
// Vercel Cron (every 5 min) retries them so no order is left without courier
// history due to a transient vendor outage. Each order is retried at most
// MAX_RETRIES times to bound vendor cost; admin reads Mongo only.
const BATCH_LIMIT = 20;
const MAX_RETRIES = 3;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const secret = process.env.CRON_SECRET;
  const headerSecret = req.headers['authorization'];
  if (secret && headerSecret !== `Bearer ${secret}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await connectDB();

    const pending = await Order.find({
      qcStatus: { $in: ['pending', 'failed'] },
      qcRetryCount: { $lt: MAX_RETRIES },
    })
      .sort({ createdAt: 1 })
      .limit(BATCH_LIMIT)
      .lean();

    let updated = 0;
    let failed = 0;
    let skipped = 0;

    for (const order of pending) {
      try {
        const qcData = await fetchCourierHistory(order.phone);
        if (qcData) {
          await Order.updateOne(
            { _id: order._id },
            {
              $set: {
                fraudCheck: qcData,
                qcStatus: 'ok',
                qcCheckedAt: new Date(),
              },
            },
          );
          updated += 1;
        } else {
          // Invalid phone (helper returns null without calling vendor) counts
          // as skipped; anything else is a retryable failure.
          const valid = !!normalizePhoneForQC(order.phone);
          await Order.updateOne(
            { _id: order._id },
            {
              $set: {
                qcStatus: valid ? 'failed' : 'skipped',
                qcCheckedAt: new Date(),
              },
              $inc: { qcRetryCount: 1 },
            },
          );
          if (valid) failed += 1;
          else skipped += 1;
        }
      } catch (err) {
        console.warn('[CRON] backfill-qc order error:', order?.orderId, err?.message || err);
        await Order.updateOne(
          { _id: order._id },
          { $set: { qcStatus: 'failed', qcCheckedAt: new Date() }, $inc: { qcRetryCount: 1 } },
        ).catch(() => {});
        failed += 1;
      }
    }

    return res.status(200).json({ ok: true, pending: pending.length, updated, failed, skipped });
  } catch (error) {
    console.error('[CRON] backfill-qc error:', error.message || error);
    return res.status(500).json({ message: 'Failed' });
  }
}
