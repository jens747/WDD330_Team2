import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function animateCart() {
  // select the cart backpack icon
  let bag = document.querySelector(".backpack");
  // add the animation class to the cart backpack icon
  bag.classList.add("stuffed");

  // When the animation ends remove the animation class
  bag.addEventListener(
    "animationend",
    () => {
      bag.classList.remove("stuffed");
    },
    { once: true }
  );
  // Source: https://www.javascripttutorial.net/dom/events/create-a-one-off-event-handler/
}

function addProductToCart(product) {
  product.Quantity = 1;
  // get the contents of the cart
  let storage = getLocalStorage("so-cart");
  // if there are no contents in the cart, create an
  // array with the product as the only item
  if (storage == null) {
    setLocalStorage("so-cart", [product]);
  }
  // If there are contents already, add the product
  // to the end of the array and set it as the new
  // value to the same key
  else {
    storage.push(product);
    setLocalStorage("so-cart", storage);
  }
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  animateCart();
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
