class Cart {
  cartItems;
  #localStorageKey; //# is a private property

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
    if (!this.cartItems) {
      this.cartItems = [{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        deliveryOptionId : '1'
      },
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId : '2'
      }
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }
    
  //add to cart function
  addToCart(productId) {
    const quantitySelector = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`);



    const selectQuantity = quantitySelector ? Number(quantitySelector.value): 1;

    let matchingItem = this.cartItems.find(item => item.productId === productId);

    if (matchingItem) {
      matchingItem.quantity += selectQuantity;
    } else {
      this.cartItems.push({
        productId,
        quantity: selectQuantity,
        deliveryOptionId : '1'
      })

    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    let matchingItem = this.cartItems.find(item => item.productId === productId);

    if (matchingItem) matchingItem.quantity = newQuantity;
    
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem = this.cartItems.find(item => item.productId === productId);

    if (!matchingItem) {
      console.warn(`No matching cart item for productId=${productId}`);
      return;
    }

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const cart = new Cart('cart-oops');
const businessCart = new Cart('Business-Cart');






cart.addToCart('77919bbe-0e56-475b-adde-4f24dfed3a04');
console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);