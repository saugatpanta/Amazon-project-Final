export let cart =
  
  JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1
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
    cart.push({ productId, quantity: selectQuantity });
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