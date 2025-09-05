export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
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
  
  

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

//add to cart function
export function addToCart(productId) {
  const quantitySelector = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`);
  const selectQuantity = Number(quantitySelector.value);

  let matchingItem = cart.find(item => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += selectQuantity;
  } else {
    cart.push({
      productId,
      quantity: selectQuantity,
      deliveryOptionId : '1'
    });

  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem = cart.find(item => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity = newQuantity;
  }

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem = cart.find(item => item.productId === productId);

  if (!matchingItem) {
    console.warn(`No matching cart item for productId=${productId}`);
    return;
  }


  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}