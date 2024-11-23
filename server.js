const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Constants
const consumerKey = process.env.MPESA_CONSUMER_KEY;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
const shortCode = process.env.MPESA_SHORT_CODE;
const passkey = process.env.MPESA_PASSKEY;

// Utility to get the current timestamp in the required format
const getTimestamp = () => {
  const now = new Date();
  return now.toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
};

// Fetch OAuth token from Safaricom API
const getToken = async () => {
  try {
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: { Authorization: `Basic ${credentials}` },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching OAuth token:', error.message);
    throw new Error('Failed to get OAuth token');
  }
};

// M-Pesa STK Push API endpoint
app.post('/mpesa/stkpush', async (req, res) => {
  try {
    const token = await getToken();
    const timestamp = getTimestamp();
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    const { amount, phone } = req.body;

    // Validate input
    if (!amount || !phone) {
      return res.status(400).json({ message: 'Amount and phone number are required' });
    }

    const requestPayload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: shortCode,
      PhoneNumber: phone,
      CallBackURL: 'https://ngt-e-mart.vercel.app/mpesa/callback',
      AccountReference: 'Order12345',
      TransactionDesc: 'Payment for Order 12345',
    };

    // Send STK Push request to Safaricom API
    const { data } = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      requestPayload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.status(200).json(data);
  } catch (error) {
    console.error('Error processing STK Push:', error.message);
    if (error.response) {
      res.status(500).json(error.response.data);
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

// Default route for server health check
app.get('/', (req, res) => {
  res.send('NGT eMart M-Pesa Integration is running.');
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
