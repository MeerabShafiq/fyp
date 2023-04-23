const stripe = require('stripe')('sk_test_51My2lUGtwtMhoEnmfcTfmrr8whC3sU6G07lscUl0a6g9fTDZX0ClMzZD6d4wGzSS4g4bPulIPyJZhKcO56x0XWJ00N4bVIpiN');
const nodemailer = require('nodemailer');
exports.handleWebhook = async (req, res) => {
  console.log('akskdaskjdsdsa====================>');
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    // Send receipt email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rockbutt0@gmail.com',
        pass: '080907',
      },
    });

    const mailOptions = {
      from: 'rockbutt0@gmail.com',
      to: paymentIntent.receipt_email,
      subject: `Payment receipt for order #${paymentIntent.id}`,
      text: `Thank you for your purchase! Your payment of $${(paymentIntent.amount / 100).toFixed(
        2
      )} has been received. Please keep this email as your receipt.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  res.sendStatus(200);
};
exports.createPaymentIntent = async (req, res) => {
  const { amount, email } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      receipt_email: email,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create payment intent' });
  }
};


