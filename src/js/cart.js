import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // jj--if statement added to fix cart.html error
  if (
    cartItems === null ||
    (Array.isArray(cartItems) && cartItems.length === 0)
  ) {
    document.querySelector(".cart_product-list").innerHTML = "";
    // if cartItems is null, cartItemTemplate is bypassed
    document.querySelector(".cart-product-list").innerHTML = null;
    return;
  }

  // If cartItems gets an array of objects from localStorage
  if (Array.isArray(cartItems)) {
    // Iterate through the array of objects and display the HTML
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));

    document.querySelector(".cart_product-list").innerHTML = htmlItems.join("");
  } else {
    // Else if cartItems gets an object from localStorage
    if (typeof cartItems === "object") {
      // Display the HTML from cartItems object
      const htmlItems = cartItemTemplate(cartItems);
      document.querySelector(".cart_product-list").innerHTML = htmlItems;
    }
  }
  set_delete_buttons();
  set_quantity_buttons();
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
  <p class="cart-card__quantity">qty: ${item.Quantity} <button class="cart-card__quantity_increase" data-id="${item.Id}">+</button><button class="cart-card__quantity_decrease" data-id="${item.Id}">-</button></p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-card__delete" data-id="${item.Id}">x</button>
</li>`;

  return newItem;
}

renderCartContents();

function deleteFromCart(product) {
  const storage = getLocalStorage("so-cart");
  let new_storage = [];
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].Id != product.srcElement.dataset.id) {
      new_storage.push(storage[i]);
    }
  }
  setLocalStorage("so-cart", new_storage);
  renderCartContents();
}

function set_delete_buttons() {
  const delete_buttons = document.querySelectorAll(".cart-card__delete");
  for (let i = 0; i < delete_buttons.length; i++) {
    delete_buttons[i].addEventListener("click", deleteFromCart);
  }
}

function set_quantity_buttons() {
  const increase_buttons = document.querySelectorAll(
    ".cart-card__quantity_increase"
  );
  for (let i = 0; i < increase_buttons.length; i++) {
    increase_buttons[i].addEventListener("click", increase_quantity);
  }
  const decrease_buttons = document.querySelectorAll(
    ".cart-card__quantity_decrease"
  );
  for (let i = 0; i < decrease_buttons.length; i++) {
    decrease_buttons[i].addEventListener("click", decrease_quantity);
  }
}

function increase_quantity(product) {
  const storage = getLocalStorage("so-cart");
  let new_storage = [];
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].Id == product.srcElement.dataset.id) {
      let newProduct = storage[i];
      newProduct.Quantity += 1;
      new_storage.push(newProduct);
    } else {
      new_storage.push(storage[i]);
    }
  }
  setLocalStorage("so-cart", new_storage);
  renderCartContents();
}

function decrease_quantity(product) {
  const storage = getLocalStorage("so-cart");
  let new_storage = [];
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].Id == product.srcElement.dataset.id) {
      if (storage[i].Quantity != 1) {
        let newProduct = storage[i];
        newProduct.Quantity -= 1;
        new_storage.push(newProduct);
      }
    } else {
      new_storage.push(storage[i]);
    }
  }
  setLocalStorage("so-cart", new_storage);
  renderCartContents();
}