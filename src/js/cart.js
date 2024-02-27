import { loadHeaderFooter } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

loadHeaderFooter();
shoppingCart();

// import { getLocalStorage, loadHeaderFooter, setLocalStorage, updateCart } from "./utils.mjs";

// loadHeaderFooter();

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");

//   // jj--if statement added to fix cart.html error
//   if (
//     cartItems === null ||
//     (Array.isArray(cartItems) && cartItems.length === 0)
//   ) {
//     document.querySelector(".product-list").innerHTML = "";
//     // if cartItems is null, cartItemTemplate is bypassed
//     return;
//   }

//   // If cartItems gets an array of objects from localStorage
//   if (Array.isArray(cartItems)) {
//     // Iterate through the array of objects and display the HTML
//     const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//     document.querySelector(".product-list").innerHTML = htmlItems.join("");
//   } else {
//     // Else if cartItems gets an object from localStorage
//     if (typeof cartItems === "object") {
//       // Display the HTML from cartItems object
//       const htmlItems = cartItemTemplate(cartItems);
//       document.querySelector(".product-list").innerHTML = htmlItems;
//     }
//   }
//   set_delete_buttons();
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
//   <button class="cart-card__delete" data-id="${item.Id}">x</button>
// </li>`;

//   return newItem;
// }

// renderCartContents();

// function deleteFromCart(product) {
//   const storage = getLocalStorage("so-cart");
//   let new_storage = [];
//   for (let i = 0; i < storage.length; i++) {
//     if (storage[i].Id != product.srcElement.dataset.id) {
//       new_storage.push(storage[i]);
//     }
//   }
//   setLocalStorage("so-cart", new_storage);
//   renderCartContents();
//   updateCart();
// }

// function set_delete_buttons() {
//   const delete_buttons = document.querySelectorAll(".cart-card__delete");
//   for (let i = 0; i < delete_buttons.length; i++) {
//     delete_buttons[i].addEventListener("click", deleteFromCart);
//   }
// }
