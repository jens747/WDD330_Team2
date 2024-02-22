import { getLocalStorage, setLocalStorage, renderListWithTemplate, updateCart } from "./utils.mjs";

export default function ShoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");
  
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  set_delete_buttons();
  updateCart();
  const total = calculateListTotal(cartItems);
  displayCartTotal(total);
}

function displayCartTotal(total) {
  const listTotal = document.querySelector(".list-total");
  listTotal.innerText = "";
  if (total > 0) {
    // show our checkout button and total if there are items in the cart.
    document.querySelector(".list-footer").classList.remove("hide");
    document.querySelector(".list-total").innerText += ` $${total}`;
  } else {
    document.querySelector(".list-footer").classList.add("hide");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
  <picture>
    <source media="(min-width: 900px)" srcset="${item.Images.PrimaryExtraLarge}">
    <source media="(min-width: 720px)" srcset="${item.Images.PrimaryLarge}">
    <source media="(min-width: 540px)" srcset="${item.Images.PrimaryMedium}">
    <img src="${item.Images.PrimarySmall}" alt="Image of ${item.Name}">
  </picture>
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-card__delete" data-id="${item.Id}">x</button>
</li>`;

  return newItem;
}

function calculateListTotal(list) {
  const amounts = list.map((item) => item.FinalPrice);
  const total = amounts.reduce((sum, item) => sum + item, 0);
  return total;
}

function deleteFromCart(product) {
  const storage = getLocalStorage("so-cart");
  let new_storage = [];
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].Id != product.srcElement.dataset.id) {
      new_storage.push(storage[i]);
    }
  }
  setLocalStorage("so-cart", new_storage);
  ShoppingCart();
}

function set_delete_buttons() {
  const delete_buttons = document.querySelectorAll(".cart-card__delete");
  for (let i = 0; i < delete_buttons.length; i++) {
    delete_buttons[i].addEventListener("click", deleteFromCart);
  }
}