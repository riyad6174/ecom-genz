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

// Shared client-side order attribution helper.
// No dependencies. Safe to call on server (returns empty defaults).
// Persists FIRST-TOUCH attribution in localStorage so retargeting /
// organic visits keep their original source even if the user comes back later.

const FIRST_TOUCH_KEY = 'first_touch_v1';

function safeWindow() {
  return typeof window !== 'undefined' ? window : null;
}

function parseBrowser(ua) {
  const s = ua || '';
  if (/Edg\//i.test(s)) return 'Edge';
  if (/OPR\/|Opera/i.test(s)) return 'Opera';
  if (/SamsungBrowser/i.test(s)) return 'Samsung Internet';
  if (/Firefox\/|FxiOS/i.test(s)) return 'Firefox';
  if (/FBIOS|FBAN|FBAV/i.test(s)) return 'Facebook App';
  if (/Instagram/i.test(s)) return 'Instagram App';
  if (/CriOS|Chrome\//i.test(s)) return 'Chrome';
  if (/Version\/.*Safari\//i.test(s)) return 'Safari';
  return 'Unknown';
}

function parseDevice(ua) {
  const s = ua || '';
  const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(s);
  const tablet = /iPad|Tablet/i.test(s);
  const os = /Android/i.test(s)
    ? 'Android'
    : /iPhone|iPad|iPod/i.test(s)
      ? 'iOS'
      : /Windows/i.test(s)
        ? 'Windows'
        : /Macintosh|Mac OS/i.test(s)
          ? 'macOS'
          : /Linux/i.test(s)
            ? 'Linux'
            : 'Unknown';
  return {
    deviceType: tablet ? 'Tablet' : mobile ? 'Mobile' : 'Desktop',
    os,
  };
}

// Decide traffic source from URL params + referrer.
// Priority: explicit utm_source > fbclid (meta) > gclid/gbraid/wbraid (google)
// > referrer hostname (facebook/instagram/google/tiktok/youtube) > direct/organic.
export function detectTrafficSource({ search = '', referrer = '' } = {}) {
  const q = new URLSearchParams(search || '');
  const utmSource = (q.get('utm_source') || '').toLowerCase();
  const utmMedium = (q.get('utm_medium') || '').toLowerCase();
  const hasFbclid = q.has('fbclid');
  const hasGclid = q.has('gclid') || q.has('gbraid') || q.has('wbraid');
  const ref = (referrer || '').toLowerCase();

  if (utmSource.includes('fb') || utmSource.includes('meta') || utmSource.includes('instagram'))
    return 'meta';
  if (utmSource.includes('google') || utmSource.includes('youtube'))
    return 'google';
  if (utmSource.includes('tiktok')) return 'tiktok';
  if (hasFbclid) return 'meta';
  if (hasGclid) return 'google';
  if (/facebook\.com|fb\.com|instagram\.com|messenger\.com/.test(ref)) return 'meta';
  if (/google\.|youtube\.com|gmail\.com/.test(ref)) return 'google';
  if (/tiktok\.com/.test(ref)) return 'tiktok';
  if (utmSource) return utmSource;
  if (utmMedium) return utmMedium;
  if (ref) return 'referral';
  return 'organic';
}

function readFirstTouch() {
  try {
    const raw = safeWindow()?.localStorage?.getItem(FIRST_TOUCH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeFirstTouch(touch) {
  try {
    safeWindow()?.localStorage?.setItem(FIRST_TOUCH_KEY, JSON.stringify(touch));
  } catch {
    // storage unavailable — ignore
  }
}

// Capture current-visit attribution and merge with stored first-touch.
// Call on every landing/product page view; cheap and idempotent.
export function captureAttribution() {
  const win = safeWindow();
  if (!win) return {};
  const search = win.location?.search || '';
  const q = new URLSearchParams(search);
  const current = {
    trafficSource: detectTrafficSource({ search, referrer: document.referrer || '' }),
    utmSource: q.get('utm_source') || '',
    utmMedium: q.get('utm_medium') || '',
    utmCampaign: q.get('utm_campaign') || '',
    landingUrl: win.location?.href || '',
    referrer: document.referrer || '',
    firstTouch: readFirstTouch(),
  };
  if (!current.firstTouch) {
    const ft = {
      trafficSource: current.trafficSource,
      utmSource: current.utmSource,
      utmMedium: current.utmMedium,
      utmCampaign: current.utmCampaign,
      landingUrl: current.landingUrl,
      referrer: current.referrer,
      at: new Date().toISOString(),
    };
    writeFirstTouch(ft);
    current.firstTouch = ft;
  }
  return current;
}

// Full metadata blob to attach to every order POST.
// Server re-validates customerType by phone; client value is a hint only.
export function collectOrderMeta() {
  const win = safeWindow();
  if (!win) return {};
  const attr = captureAttribution();
  const ua = win.navigator?.userAgent || '';
  const { deviceType, os } = parseDevice(ua);
  return {
    userAgent: ua,
    deviceType,
    deviceOS: os,
    browser: parseBrowser(ua),
    landingUrl: attr.landingUrl || win.location?.href || '',
    referrer: attr.referrer || '',
    trafficSource: attr.trafficSource || 'organic',
    utmSource: attr.utmSource || '',
    utmMedium: attr.utmMedium || '',
    utmCampaign: attr.utmCampaign || '',
    firstTouchSource: attr.firstTouch?.trafficSource || '',
    firstTouchUrl: attr.firstTouch?.landingUrl || '',
    pageUrl: win.location?.href || '',
  };
}
