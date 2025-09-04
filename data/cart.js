export const cart = [];

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
}