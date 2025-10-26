import { google } from 'googleapis';

export default async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    console.log('Raw request body:', req.body);
    if (!req.body || typeof req.body !== 'object') {
      console.error('Invalid request body:', req.body);
      return res
        .status(400)
        .json({ message: 'Request body is missing or invalid' });
    }

    const { name, phone, message, submissionTime } = req.body;

    if (!name || !phone || !message || !submissionTime) {
      return res.status(400).json({
        message:
          'Missing required fields: name, phone, message, submissionTime',
      });
    }

    // Validate phone number format
    if (!/^\+880\d{10}$/.test(phone)) {
      return res.status(400).json({
        message:
          'Invalid phone number format. Must be a valid Bangladesh phone number.',
      });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    console.log('Environment variables:', {
      clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
      sheetId: process.env.GOOGLE_SHEET_ID,
      hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      console.error('Missing GOOGLE_SHEET_ID');
      return res
        .status(500)
        .json({
          message: 'Server configuration error: Missing Google Sheet ID',
        });
    }

    const sheetName = 'Queries';

    // Check if Queries sheet has headers
    const checkSheet = await sheets.spreadsheets.values
      .get({
        spreadsheetId,
        range: `${sheetName}!A1:D1`,
      })
      .catch((error) => {
        console.error('Check sheet error:', error.message);
        throw error;
      });

    if (!checkSheet.data.values) {
      await sheets.spreadsheets.values
        .update({
          spreadsheetId,
          range: `${sheetName}!A1:D1`,
          valueInputOption: 'RAW',
          resource: {
            values: [['Name', 'Phone', 'Message', 'SubmissionTime']],
          },
        })
        .catch((error) => {
          console.error('Header update error:', error.message);
          throw error;
        });
    }

    const response = await sheets.spreadsheets.values
      .append({
        spreadsheetId,
        range: `${sheetName}!A2`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [[name, phone, message, submissionTime]],
        },
      })
      .catch((error) => {
        console.error('Append error:', error.message);
        throw error;
      });

    console.log(`Rows updated: ${response.data.updates.updatedCells}`);

    return res.status(200).json({
      message: 'Query data submitted successfully!',
      data: { name, phone, message, submissionTime },
    });
  } catch (error) {
    console.error('API error:', {
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({
      message: 'Failed to submit query data',
      error: error.message,
    });
  }
};
