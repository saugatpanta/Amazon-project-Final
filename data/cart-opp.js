function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem('localStorageKey'));
    
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
    },

    saveToStorage() {
    localStorage.setItem('localStorageKey', JSON.stringify(this.cartItems));
    },
    
    //add to cart function
    addToCart(productId) {
      const quantitySelector = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`);
      const selectQuantity = Number(quantitySelector.value);

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
    },

    removeFromCart(productId) {
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;

      this.saveToStorage();
    },

    updateQuantity(productId, newQuantity) {
      let matchingItem = this.cartItems.find(item => item.productId === productId);

      if (matchingItem) matchingItem.quantity = newQuantity;
      
      this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem = this.cartItems.find(item => item.productId === productId);

      if (!matchingItem) {
        console.warn(`No matching cart item for productId=${productId}`);
        return;
      }

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('busi');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
