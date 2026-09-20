import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    deliveryZone: { type: String, required: true },
    address: { type: String, required: true },
    items: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    shippingCharge: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    orderId: { type: String, required: true, unique: true },
    orderDate: { type: String },
    submissionTime: { type: String },
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'cancel'],
      default: 'pending',
    },
    responseStatus: {
      type: String,
      enum: ['called', 'number_off', 'did_not_pick', 'call_later', 'fake_order', null],
      default: null,
    },
    note: { type: String, default: '' },
    // Set at creation time when total item quantity exceeds the trusted threshold —
    // used to hide the order from GTM/Meta conversion tracking and flag it for admin review.
    isSuspicious: { type: Boolean, default: false },

    // Courier delivery history from FraudChecker (informational — never blocks an order).
    fraudCheck: {
      totalParcels: { type: Number, default: 0 },
      totalDelivered: { type: Number, default: 0 },
      totalCancelled: { type: Number, default: 0 },
      deliveryRate: { type: Number, default: null },
      riskStatus: { type: String, default: '' },
      couriers: {
        type: Map,
        of: new mongoose.Schema(
          { total: Number, delivered: Number, cancelled: Number },
          { _id: false },
        ),
        default: {},
      },
    },
    qcStatus: { type: String, enum: ['pending', 'ok', 'failed', 'skipped'], default: 'pending' },
    qcCheckedAt: { type: Date, default: null },
    qcRetryCount: { type: Number, default: 0 },

    // Attribution / device (collected client-side, sanitized server-side).
    userAgent: { type: String, default: '' },
    deviceType: { type: String, default: '' },
    deviceOS: { type: String, default: '' },
    browser: { type: String, default: '' },
    landingUrl: { type: String, default: '' },
    pageUrl: { type: String, default: '' },
    referrer: { type: String, default: '' },
    trafficSource: { type: String, default: 'organic' },
    utmSource: { type: String, default: '' },
    utmMedium: { type: String, default: '' },
    utmCampaign: { type: String, default: '' },
    firstTouchSource: { type: String, default: '' },
    firstTouchUrl: { type: String, default: '' },
    customerType: { type: String, enum: ['new', 'repeat'], default: 'new' },
    previousOrderCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

orderSchema.index({ name: 'text', phone: 'text', orderId: 'text' });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ responseStatus: 1 });
orderSchema.index({ isSuspicious: 1 });
orderSchema.index({ 'fraudCheck.riskStatus': 1 });
orderSchema.index({ qcStatus: 1 });
orderSchema.index({ trafficSource: 1 });
orderSchema.index({ customerType: 1 });
orderSchema.index({ phone: 1 });

if (process.env.NODE_ENV !== 'production' && mongoose.models.Order) {
  delete mongoose.models.Order;
}
export default mongoose.models.Order || mongoose.model('Order', orderSchema);
