import { getLocalStorage } from "./utils.mjs";

addItem(quantity.quantity);

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // If cartItems gets an array of objects from localStorage
  if (Array.isArray(cartItems)) {
    // Iterate through the array of objects and display the HTML
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    // Else if cartItems gets an object from localStorage
    if (typeof cartItems === "object") {
      // Display the HTML from cartItems object
      const htmlItems = cartItemTemplate(cartItems);
      document.querySelector(".product-list").innerHTML = htmlItems;
    }
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
