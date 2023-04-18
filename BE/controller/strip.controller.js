
const stripe = require("stripe")('sk_test_51My2lUGtwtMhoEnmzJkay324eJy0tecuMQARHEKnozIRHX4XscTNQ902KvuZRR4qfXhWHKjNelFwVAFiClwg03RI005JYhlbmK')
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
exports.strip = async (req, res) => {
    const { items } = req.body;
  console.log(req);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      success:true,
    });

    
};
