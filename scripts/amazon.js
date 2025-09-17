import {addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { updateCartQuantity } from './utils/cartQuantity.js';


let productsHtml = '';

products.forEach((product) => {
  productsHtml+=`
      <div class="product-container">
        <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class = "js-quantity-selector" data-product-id = "${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHtml()} 

        <div class="product-spacer"></div>

        <div class="added-to-cart js-add-notification" data-product-id = "${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart " 
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
  `;
});

/* Polymorphism = use a method without knowing the class */

document.querySelector('.js-products-grids').innerHTML = productsHtml;



const notificationTimeouts = {};

//update cart function
function notificationUpdate(productId) {
    const notification = document.querySelector(`.js-add-notification[data-product-id="${productId}"]`);

    notification.classList.add('added-visible');

    if (notificationTimeouts[productId]) {
      clearTimeout(notificationTimeouts[productId]);
    }
    
      notificationTimeouts[productId] = setTimeout(() => {
        notification.classList.remove('added-visible');
        delete notificationTimeouts[productId];
      }, 2000);

}


document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    
    //for updating the cart
    addToCart(productId);

    //updates the cart
    updateCartQuantity()

    //updates the notification of add cart
    notificationUpdate(productId);
  })
});

updateCartQuantity();
