import paypal from '@paypal/checkout-server-sdk';

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret); // Use LiveEnvironment for production
const client = new paypal.core.PayPalHttpClient(environment);

export const createPayPalOrder = async (req, res) => {
  const { amount } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: amount,
        },
      },
    ],
  });

  try {
    const response = await client.execute(request);
    res.json(response.result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const capturePayPalOrder = async (req, res) => {
  const { orderID } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderID);

  try {
    const response = await client.execute(request);
    res.json(response.result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};