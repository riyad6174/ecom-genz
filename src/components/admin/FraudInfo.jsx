import { useState } from 'react';
import { FiTruck, FiShield, FiChevronDown, FiGlobe } from 'react-icons/fi';

const SOURCE_CONFIG = {
  meta:     { label: 'Meta',     badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  google:   { label: 'Google',   badge: 'bg-red-500/20 text-red-300 border-red-500/40' },
  tiktok:   { label: 'TikTok',   badge: 'bg-pink-500/20 text-pink-300 border-pink-500/40' },
  organic:  { label: 'Organic',  badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  referral: { label: 'Referral', badge: 'bg-violet-500/20 text-violet-300 border-violet-500/40' },
};
const SOURCE_FALLBACK = 'bg-slate-600/40 text-slate-300 border-slate-600/50';

const CUSTOMER_CONFIG = {
  new:    { label: 'New',    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
  repeat: { label: 'Repeat', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
};

function rateTone(rate) {
  if (rate === null || rate === undefined) {
    return { text: 'text-slate-400', bar: 'bg-slate-500', badge: 'bg-slate-600/40 text-slate-300 border-slate-600/50' };
  }
  if (rate >= 80) return { text: 'text-emerald-400', bar: 'bg-emerald-500', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
  if (rate >= 50) return { text: 'text-amber-400', bar: 'bg-amber-500', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
  return { text: 'text-red-400', bar: 'bg-red-500', badge: 'bg-red-500/20 text-red-300 border-red-500/40' };
}

function riskBadgeClass(risk) {
  const r = (risk || '').toLowerCase();
  if (r.includes('low')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  if (r.includes('medium') || r.includes('moderate')) return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  if (r.includes('high')) return 'bg-red-500/20 text-red-300 border-red-500/40';
  return 'bg-slate-600/40 text-slate-300 border-slate-600/50';
}

function formatDhaka(date) {
  try {
    return new Date(date).toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });
  } catch {
    return '';
  }
}

// Small delivery-rate + risk badges shown under the phone number (only when a QC result exists).
export function FraudBadges({ order }) {
  const fc = order?.fraudCheck;
  if (order?.qcStatus !== 'ok' || !fc) return null;
  const hasRate = fc.deliveryRate !== null && fc.deliveryRate !== undefined;
  if (!hasRate && !fc.riskStatus) return null;
  const tone = rateTone(hasRate ? fc.deliveryRate : null);
  return (
    <div className='flex flex-wrap items-center gap-1 mt-1'>
      {hasRate && (
        <span
          title={`${fc.totalDelivered}/${fc.totalParcels} delivered`}
          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-black uppercase tracking-wider ${tone.badge}`}
        >
          <FiTruck className='w-2.5 h-2.5' /> {Math.round(fc.deliveryRate)}%
        </span>
      )}
      {fc.riskStatus && (
        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-black uppercase tracking-wider ${riskBadgeClass(fc.riskStatus)}`}>
          <FiShield className='w-2.5 h-2.5' /> {fc.riskStatus}
        </span>
      )}
    </div>
  );
}

export function CourierHistory({ order }) {
  const [open, setOpen] = useState(true);
  const fc = order?.fraudCheck;
  const hasData = order?.qcStatus === 'ok' && fc && (fc.totalParcels > 0 || (fc.deliveryRate !== null && fc.deliveryRate !== undefined));
  let fallback = '';
  if (!hasData) {
    if (order?.qcStatus === 'ok') fallback = 'No previous courier history for this number.';
    else if (order?.qcStatus === 'skipped') fallback = 'QC skipped — invalid phone format.';
    else if (order?.qcStatus === 'failed') fallback = 'QC lookup failed — will retry automatically.';
    else if (order?.qcStatus === 'pending') fallback = 'QC lookup pending.';
    else fallback = 'No courier data available.';
  }
  const tone = rateTone(hasData ? fc.deliveryRate : null);
  const couriers = fc?.couriers ? Object.entries(fc.couriers) : [];

  return (
    <div className='bg-slate-900/60 rounded-xl border border-slate-700 mb-5 overflow-hidden'>
      <button onClick={() => setOpen((o) => !o)} className='w-full flex items-center justify-between gap-3 px-4 py-3 text-left'>
        <span className='text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2'>
          <span className='w-1 h-3.5 bg-blue-500 rounded-full inline-block' /> Courier History
        </span>
        <span className='flex items-center gap-1.5'>
          {hasData && fc.deliveryRate !== null && fc.deliveryRate !== undefined && (
            <span className={`px-1.5 py-0.5 rounded border text-[9px] font-black uppercase tracking-wider ${tone.badge}`}>{Math.round(fc.deliveryRate)}%</span>
          )}
          {hasData && fc.riskStatus && (
            <span className={`px-1.5 py-0.5 rounded border text-[9px] font-black uppercase tracking-wider ${riskBadgeClass(fc.riskStatus)}`}>{fc.riskStatus}</span>
          )}
          <FiChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      {open && (
      <div className='border-t border-slate-700/50 p-4'>
      {!hasData ? (
        <p className='text-xs text-slate-400'>{fallback}</p>
      ) : (
        <>
          <div className='flex items-center justify-between gap-3 mb-3'>
            <div className={`text-2xl font-black ${tone.text}`}>
              {fc.deliveryRate !== null && fc.deliveryRate !== undefined ? `${Math.round(fc.deliveryRate)}%` : '—'}
              <span className='ml-2 text-[10px] font-black text-slate-500 uppercase tracking-wider'>delivery rate</span>
            </div>
            {fc.riskStatus && (
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${riskBadgeClass(fc.riskStatus)}`}>
                <FiShield className='w-3 h-3' /> {fc.riskStatus}
              </span>
            )}
          </div>
          <div className='grid grid-cols-3 gap-2 mb-3'>
            {[
              { label: 'Parcels', value: fc.totalParcels, cls: 'text-slate-200' },
              { label: 'Delivered', value: fc.totalDelivered, cls: 'text-emerald-400' },
              { label: 'Cancelled', value: fc.totalCancelled, cls: 'text-red-400' },
            ].map((c) => (
              <div key={c.label} className='bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-center'>
                <div className={`text-lg font-black ${c.cls}`}>{c.value}</div>
                <div className='text-[9px] font-black text-slate-500 uppercase tracking-wider'>{c.label}</div>
              </div>
            ))}
          </div>
          {couriers.length > 0 && (
            <div className='space-y-2'>
              {couriers.map(([name, c]) => {
                const rate = c.total > 0 ? Math.round((c.delivered / c.total) * 100) : null;
                const ct = rateTone(rate);
                return (
                  <div key={name}>
                    <div className='flex items-center justify-between gap-2 text-[11px] mb-1'>
                      <span className='font-bold text-slate-300'>{name}</span>
                      <span className='text-slate-500 font-bold text-right'>
                        {c.total} received · <span className='text-emerald-400'>{c.delivered} delivered</span> · <span className='text-red-400'>{c.cancelled} cancelled</span>
                      </span>
                    </div>
                    <div className='h-1.5 bg-slate-700 rounded-full overflow-hidden'>
                      <div className={`h-full ${ct.bar}`} style={{ width: `${rate || 0}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {order.qcCheckedAt && (
            <p className='mt-3 text-[10px] text-slate-500 font-bold'>Checked: {formatDhaka(order.qcCheckedAt)}</p>
          )}
        </>
      )}
      </div>
      )}
    </div>
  );
}

export function TrackingSection({ order }) {
  const [open, setOpen] = useState(true);
  const src = order?.trafficSource || 'organic';
  const srcCfg = SOURCE_CONFIG[src];
  const cust = CUSTOMER_CONFIG[order?.customerType] || CUSTOMER_CONFIG.new;
  const utm = [order?.utmSource, order?.utmMedium].filter(Boolean).join(' / ');
  const device = [order?.deviceType, order?.deviceOS, order?.browser].filter(Boolean).join(' · ');
  const landing = order?.landingUrl || order?.pageUrl;
  const rows = [
    { label: 'Customer', value: order?.customerType === 'repeat' ? `Repeat (${order.previousOrderCount || 0} previous)` : 'New customer' },
    { label: 'Source', value: `${srcCfg?.label || src}${order?.utmCampaign ? ` — ${order.utmCampaign}` : ''}${utm ? ` (${utm})` : ''}` },
    { label: 'First Touch', value: order?.firstTouchSource },
    { label: 'Device', value: device },
    { label: 'Landing', value: landing, link: landing },
    { label: 'Referrer', value: order?.referrer, link: order?.referrer },
  ].filter((r) => r.value);
  const labelCls = 'px-4 py-2.5 text-[11px] font-black text-slate-500 uppercase tracking-wider w-24 border-r border-slate-700/50 align-top';

  return (
    <div className='bg-slate-900/60 rounded-xl border border-slate-700 mb-5 overflow-hidden'>
      <button onClick={() => setOpen((o) => !o)} className='w-full flex items-center justify-between gap-3 px-4 py-3 text-left'>
        <span className='text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2'>
          <span className='w-1 h-3.5 bg-blue-500 rounded-full inline-block' /> Tracking &amp; Attribution
        </span>
        <span className='flex items-center gap-1.5'>
          <span className={`px-1.5 py-0.5 rounded border text-[9px] font-black uppercase tracking-wider ${cust.badge}`}>{cust.label}</span>
          <span
            title={landing || order?.referrer || ''}
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-black uppercase tracking-wider ${srcCfg?.badge || SOURCE_FALLBACK}`}
          >
            <FiGlobe className='w-2.5 h-2.5' /> {srcCfg?.label || src}
          </span>
          <FiChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      {open && (
        <div className='border-t border-slate-700/50'>
          <table className='w-full text-sm'>
            <tbody className='divide-y divide-slate-700/50'>
              {rows.map((r) => (
                <tr key={r.label}>
                  <td className={labelCls}>{r.label}</td>
                  <td className='px-4 py-2.5 text-slate-200 text-xs font-medium break-all'>
                    {r.link && /^https?:\/\//i.test(r.link) ? (
                      <a href={r.link} target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:text-blue-300'>{r.value}</a>
                    ) : r.value}
                  </td>
                </tr>
              ))}
              {order?.userAgent && (
                <tr>
                  <td className={labelCls}>User Agent</td>
                  <td className='px-4 py-2.5 text-slate-400 text-[10px] font-mono break-all'>{order.userAgent}</td>
                </tr>
              )}
              {!order?.userAgent && !order?.trafficSource && (
                <tr><td className='px-4 py-3 text-xs text-slate-500'>No tracking data (order placed before tracking was enabled).</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
