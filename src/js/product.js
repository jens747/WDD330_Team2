import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId);

function addProductToCart(product) {
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
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
