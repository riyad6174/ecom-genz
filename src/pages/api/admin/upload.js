import { writeFile, mkdir } from 'fs/promises';
import { join, extname } from 'path';
import { verifyAdmin } from '@/lib/auth';

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default async function handler(req, res) {
  const admin = verifyAdmin(req);
  if (!admin) return res.status(401).json({ message: 'Unauthorized' });
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { filename, data } = req.body;
  if (!filename || !data) return res.status(400).json({ message: 'filename and data required' });

  try {
    const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const ext = extname(filename).toLowerCase() || '.jpg';
    const safeName =
      filename.replace(extname(filename), '').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 60) +
      '_' + Date.now() + ext;

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, safeName), buffer);
    return res.status(200).json({ url: `/uploads/${safeName}` });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Upload failed: ' + err.message });
  }
}
