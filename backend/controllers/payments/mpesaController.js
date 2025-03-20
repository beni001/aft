import axios from 'axios';

const generatePassword = (shortcode, passkey, timestamp) => {
  const str = `${shortcode}${passkey}${timestamp}`;
  return Buffer.from(str).toString('base64');
};

export const initiateMpesaPayment = async (req, res) => {
  const { phone, amount } = req.body;
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
  const password = generatePassword(process.env.MPESA_SHORTCODE, process.env.MPESA_PASSKEY, timestamp);

  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: 'https://your-callback-url.com',
        AccountReference: 'Restaurant Payment',
        TransactionDesc: 'Payment for food order',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MPESA_ACCESS_TOKEN}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};