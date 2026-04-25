import bcrypt from 'bcryptjs';
import Admin from '@/models/Admin';

let _ensured = false;

export async function ensureDefaultAdmin() {
  if (_ensured) return;

  try {
    const count = await Admin.estimatedDocumentCount();
    if (count === 0) {
      const email = process.env.ADMIN_EMAIL || 'admin@genzfashion.com';
      const password = process.env.ADMIN_PASSWORD || 'genzadmin2026';
      const hash = await bcrypt.hash(password, 12);
      await Admin.create({ email, password: hash });
      console.log(`[Init] Default admin created: ${email}`);
    }
    _ensured = true;
  } catch (err) {
    console.warn('[Init] ensureDefaultAdmin error:', err.message);
  }
}
