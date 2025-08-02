const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const DOMAIN = process.env.CLIENT_DOMAIN || 'http://localhost:3000';

const createStripeSession = async (customerEmail) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Priority Resume Review',
              description: 'Expedited review and feedback for your resume',
            },
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${DOMAIN}/success`,
      cancel_url: `${DOMAIN}/cancel`,
    });

    return session;
  } catch (err) {
    console.error('Stripe error:', err.message);
    throw new Error('Could not create Stripe session');
  }
};

module.exports = { createStripeSession };