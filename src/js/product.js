import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { getParam } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import productDetails from "./productDetails.mjs"

const productId = getParam("product");
productDetails(productId);

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

  const cartCount=document.querySelector('.cart-count');
  let itemList = getLocalStorage("so-cart");
  console.log(itemList)
  let count=itemList.length;
  console.log(count)
  cartCount.innerHTML=count;

  if(count==0){
    cartCount.style.display='none';
  }else{
    cartCount.style.display='block';
  }
}
function addProductToCart(product) {
  const productArray = [product]
  setLocalStorage("so-cart", productArray);
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
