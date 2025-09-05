import {cart,removeFromCart, updateQuantity,updateDeliveryOption} from '../../data/cart.js';
import { getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { updateCartQuantity } from '../utils/cartQuantity.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOption.js';

export function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDates,
        'days');
      
      const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML +=
      `
    <div class="cart-item-container
    js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = "${matchingProduct.id}">
                      Update
                    </span>

                    <input type= "number" class = "quantity-input js-quantity-input" value = "${cartItem.quantity}" min = "1">

                    <span class="link-primary save-quantity-link js-save-quantity-link" data-product-id="${productId}">
                    Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}" >
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>

                  ${deliveryOptionsHTML(matchingProduct,cartItem)}
                
                </div>
              </div>
            </div>`;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {

    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDates,
        'days');
      
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)}`;
      
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      
      html +=
        `
        <div class="delivery-option js-delivery-option" 
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">

          <input type="radio" class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}" 
            ${isChecked ? 'checked':''}
            >
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
    `
    });

    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  //update delete links
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();

      updateCartQuantity();
    });
  });

  updateCartQuantity();
    

  //update quantity links

  document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) => {
    updateLink.addEventListener('click', () => {
      const productId = updateLink.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);

      container.classList.add('is-editing-quantity');
    });
  });

  //save links
  document.querySelectorAll('.js-save-quantity-link').forEach((saveLink) => {
    saveLink.addEventListener('click', () => {
      const productId = saveLink.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);

      const quantityInput = container.querySelector('.js-quantity-input');

      const newQuantity = Number(quantityInput.value);
      
        updateQuantity(productId, newQuantity);
        container.querySelector('.js-quantity-label').textContent = newQuantity;
      

      container.classList.remove('is-editing-quantity');

      updateCartQuantity();
    });
  });

  //option selector
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      
      const {productId, deliveryOptionId} = element.dataset;
      
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });

}

