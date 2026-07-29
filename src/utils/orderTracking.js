// Orders above this total quantity are treated as likely fake/spam (bulk fake COD
// orders with fabricated names/addresses) and are excluded from GTM/Meta conversion
// tracking so ad platforms don't optimize on bad data. The order itself is still saved.
export const MAX_TRUSTED_ORDER_QUANTITY = 6;

export function getOrderTotalQuantity(items = []) {
  return items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
}

export function isSuspiciousOrderQuantity(items = []) {
  return getOrderTotalQuantity(items) > MAX_TRUSTED_ORDER_QUANTITY;
}
