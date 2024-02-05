import { getLocalStorage } from "./utils.mjs";

const cartCount = document.querySelector(".cart-count");
  let itemList = getLocalStorage("so-cart");
  let count = itemList.length;
  cartCount.innerHTML = count;

  if(count == 0){
    cartCount.style.display = "none";
  }else{
    cartCount.style.display = "block";
  }