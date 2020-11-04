var Book = document.querySelector("#Book");
var stripe = Stripe('<%= srtipePublickey %>');

Book.addEventListener("click",event=>{
    stripe
  .redirectToCheckout({
    lineItems: [
      // Replace with the ID of your price
      {price: 'price_123', quantity: 1},
    ],
    mode: 'payment',
    successUrl: 'https://google.com',
    cancelUrl: 'https://localhost:3000',
  })
  .then(function(result) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
  });
})