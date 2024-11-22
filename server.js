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

// Get OAuth Token
const getToken = async () => {
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  const { data } = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: { Authorization: `Basic ${credentials}` },
  });
  return data.access_token;
};

// Lipa Na Mpesa Online Payment
app.post('/mpesa/stkpush', async (req, res) => {
  const token = await getToken();
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 14);
  const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

  const { amount, phone } = req.body;

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

  try {
    const { data } = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', requestPayload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error.response.data);
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
