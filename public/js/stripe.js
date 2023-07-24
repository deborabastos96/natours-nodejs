/* eslint-disable */
import { showAlert } from './alerts.js';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51NX9r2FU095EGqFQzhvrk2LGcfftBc6spanHrXu1h4qhMPNoo3OlAKDASAvgFD6w8KIEyewxChmk6YypvGER0Hoi00CGN5pLKt'
  );

  try {
    // 1) Get chekout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
