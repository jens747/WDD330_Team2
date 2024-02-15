import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  //check to see if there was anything there
  if (!cartContents) {
    cartContents = [];
  }
  // animate cart
  animateCart();
  // then if the product is not yet in the cart, add the current product to the list
  if (cartContents.length == 0) {
    product.Quantity = 1;
    cartContents.push(product);
  }
  // If it is already in the cart, look for it and increase the quantity by one
  else {
    for (let i = 0; i < cartContents.length; i++) {
      if (cartContents[i].Id == product.Id) {
        cartContents[i].Quantity += 1;
      }
    }
  }
  setLocalStorage("so-cart", cartContents);
}
  

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

// jj--animate-cart trello
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

  const cartCount = document.querySelector(".cart-count");
  let itemList = getLocalStorage("so-cart");
  let count = itemList.length;
  cartCount.innerHTML = count;

  if (count == 0) {
    cartCount.style.display = "none";
  } else {
    cartCount.style.display = "block";
  }
}

// import { findProductById } from "./productData.mjs";
// import { setLocalStorage } from "./utils.mjs";

// let product = {};

// export default async function productDetails(productId) {
//   // get the details for the current product. findProductById will return a promise! use await or .then() to process it
//   product = await findProductById(productId);
//   // once we have the product details we can render out the HTML
//   renderProductDetails();
//   // once the HTML is rendered we can add a listener to Add to Cart button
//   document.getElementById("addToCart").addEventListener("click", addToCart);
// }
// function addToCart() {
//   setLocalStorage("so-cart", product);
// }
// function renderProductDetails() {
//   document.querySelector("#productName").innerText = product.Brand.Name;
//   document.querySelector("#productNameWithoutBrand").innerText =
//     product.NameWithoutBrand;
//   document.querySelector("#productImage").src = product.Image;
//   document.querySelector("#productImage").alt = product.Name;
//   document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
//   document.querySelector("#productColorName").innerText =
//     product.Colors[0].ColorName;
//   document.querySelector("#productDescriptionHtmlSimple").innerHTML =
//     product.DescriptionHtmlSimple;
//   document.querySelector("#addToCart").dataset.id = product.Id;
// }
