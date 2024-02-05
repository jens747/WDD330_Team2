import { getLocalStorage } from "./utils.mjs";

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