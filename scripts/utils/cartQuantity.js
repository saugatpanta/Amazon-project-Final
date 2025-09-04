import {cart} from '../../data/cart.js';

//update cart function
export function updateCartQuantity() {
  let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    })

  document.querySelectorAll('.js-cart-quantity').forEach(element => {

    if (element.classList.contains('return-to-home-link')) {
      const itemsText = cartQuantity === 1 ? 'item' : 'items';
      element.textContent = cartQuantity > 0 ? `${cartQuantity} ${itemsText}` : '0 items';
    }else {
      element.textContent = cartQuantity > 0 ? cartQuantity : '';
    }

    
  });

  return cartQuantity;
}

