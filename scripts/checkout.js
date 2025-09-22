import { renderOrderSummary } from './checkout/orderSummary.js';

import { renderPaymentSummary } from './checkout/paymentSummary.js';

import { loadProducts } from '../data/products.js';

import { loadCart } from '../data/cart.js';

//import '../data/backend-practice.js';

//import '../data/cart-class.js';




new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
  //next step after loading the products and resolve helps to demonstrate next step
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
})



/*
loadProducts(() => {
   //callbacks functions
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/