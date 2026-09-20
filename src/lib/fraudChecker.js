// FraudChecker courier-history helper (server-only — API key never leaves the server).
// Never throws: resolves to sanitized data or null so order creation can never fail because of QC.

const DEFAULT_TIMEOUT_MS = 4500;
const MAX_COURIERS = 10;

function getConfig() {
  return {
    apiKey: process.env.FRAUDCHECKER_API_KEY || '',
    apiUrl: process.env.FRAUDCHECKER_API_URL || 'https://fraudchecker.link/api/v1/qc/',
    timeoutMs: Number(process.env.FRAUDCHECKER_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS,
  };
}

// Vendor expects 11-digit "01XXXXXXXXX". Accepts +880 / 880 / 01 + separators.
export function normalizePhoneForQC(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return null;
  let local = digits;
  // International format: 880 + 10 digits starting with 1 (e.g. 8801712345678)
  // → local format: 0 + those 10 digits (e.g. 01712345678).
  if (local.startsWith('880')) local = `0${local.slice(3)}`;
  if (!/^01\d{9}$/.test(local)) return null;
  return local;
}

function num(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function sanitizeCouriers(apis) {
  if (!apis || typeof apis !== 'object') return {};
  const out = {};
  for (const [key, c] of Object.entries(apis).slice(0, MAX_COURIERS)) {
    if (!c || typeof c !== 'object') continue;
    // Vendor shape: { courier_name, total_parcels, total_delivered_parcels, total_cancelled_parcels }
    const name = String(c.courier_name || key).slice(0, 60);
    out[name] = {
      total: num(c.total_parcels ?? c.total),
      delivered: num(c.total_delivered_parcels ?? c.delivered),
      cancelled: num(c.total_cancelled_parcels ?? c.cancelled),
    };
  }
  return out;
}

export function emptyFraudCheck() {
  return {
    totalParcels: 0,
    totalDelivered: 0,
    totalCancelled: 0,
    deliveryRate: null,
    riskStatus: '',
    couriers: {},
  };
}

export function sanitizeFraudResponse(json) {
  if (!json || typeof json !== 'object') return null;
  // Error payloads (e.g. { success: false, message }) carry no parcel data.
  const hasData =
    json.total_parcels !== undefined ||
    json.total_delivered !== undefined ||
    (json.apis && typeof json.apis === 'object') ||
    (json.couriers && typeof json.couriers === 'object');
  if (json.success === false || !hasData) return null;
  const totalParcels = num(json.total_parcels);
  const totalDelivered = num(json.total_delivered);
  // Vendor uses "total_cancel" (also accept "total_cancelled").
  const totalCancelled = num(json.total_cancel ?? json.total_cancelled);
  let rate = null;
  if (totalParcels > 0) {
    rate = Math.min(100, Math.max(0, Math.round((totalDelivered / totalParcels) * 10000) / 100));
  }
  // Vendor supplies no risk label — derive one from the delivery rate.
  let riskStatus = '';
  if (totalParcels > 0 && rate !== null) {
    riskStatus = rate >= 80 ? 'Low Risk' : rate >= 50 ? 'Medium Risk' : 'High Risk';
  }
  return {
    totalParcels,
    totalDelivered,
    totalCancelled,
    deliveryRate: rate,
    riskStatus,
    // Vendor nests per-courier stats under "apis".
    couriers: sanitizeCouriers(json.apis ?? json.couriers),
  };
}

// Main entry: fetch courier history for a raw phone string. Returns sanitized data or null.
export async function fetchCourierHistory(rawPhone) {
  const { apiKey, apiUrl, timeoutMs } = getConfig();
  const phone = normalizePhoneForQC(rawPhone);
  if (!phone) {
    console.log(`[QC] skip — invalid phone format: ${String(rawPhone || '').slice(0, 20)}`);
    return null;
  }
  if (!apiKey) {
    console.warn('[QC] skip — FRAUDCHECKER_API_KEY not set');
    return null;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const url = `${apiUrl.replace(/\/?$/, '/')}?api_key=${encodeURIComponent(apiKey)}&phone=${encodeURIComponent(phone)}`;
    const res = await fetch(url, { method: 'GET', signal: controller.signal });
    if (!res.ok) {
      console.warn(`[QC] vendor HTTP ${res.status} for ${phone}`);
      return null;
    }
    const json = await res.json().catch(() => null);
    const data = sanitizeFraudResponse(json);
    if (!data) {
      console.warn(`[QC] vendor success=false for ${phone}`);
      return null;
    }
    console.log(`[QC] ok ${phone} — ${data.totalDelivered}/${data.totalParcels} (${data.deliveryRate}%) ${data.riskStatus}`);
    return data;
  } catch (err) {
    console.warn(`[QC] fail ${phone}:`, err?.name === 'AbortError' ? `timeout after ${timeoutMs}ms` : err?.message || err);
    return null;
  } finally {
    clearTimeout(timer);
  }
}
