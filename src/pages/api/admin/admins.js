import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { verifyAdmin } from '@/lib/auth';

export default async function handler(req, res) {
  const payload = verifyAdmin(req);
  if (!payload) return res.status(401).json({ message: 'Unauthorized' });

  try {
    await connectDB();

    if (req.method === 'GET') {
      const admins = await Admin.find({}, 'email createdAt').sort({ createdAt: 1 });
      return res.status(200).json({ admins });
    }

    if (req.method === 'POST') {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }

      const existing = await Admin.findOne({ email: email.trim().toLowerCase() });
      if (existing) {
        return res.status(409).json({ message: 'An admin with this email already exists' });
      }

      const hash = await bcrypt.hash(password, 12);
      const admin = await Admin.create({ email: email.trim().toLowerCase(), password: hash });

      return res.status(201).json({ message: 'Admin created successfully', email: admin.email });
    }

    if (req.method === 'DELETE') {
      const { email } = req.body;

      if (!email) return res.status(400).json({ message: 'Email is required' });

      if (email.trim().toLowerCase() === payload.email) {
        return res.status(400).json({ message: 'You cannot delete your own account' });
      }

      const result = await Admin.deleteOne({ email: email.trim().toLowerCase() });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      return res.status(200).json({ message: 'Admin removed' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Admins API Error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
