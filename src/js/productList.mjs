import { getData } from "./productData.mjs"

export default async function productList(category = "tents", selector=".product-list") {
    const data = await getData(category);
    renderList(data, selector);
  }

function productCardTemplate(product) {

  // Object.keys(product).forEach(function(key){
  //   if (product[key] === "989CG") {
  //     document.getElementById(".product-list").style.visibility = "hidden";
  //   }
  // });

    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`;
}

function renderList(productList, selector) {
    // Object.keys(product).forEach(function(key){
    // if (product[key] === "989CG") {
    //   document.getElementById(".product-list").style.visibility = "hidden";
    // } else {
    // const filterItems = productList.filter(product)
    // productList.filter(products, ["ID", "880RR"])
    const htmlItems = productList.map((product) => productCardTemplate(product));
    // const newhtmlItems = htmlItems.filter(products, [ "Id" , "880RR"])
    // const filterItems = items.reduce()
    document.querySelector(selector).innerHTML = htmlItems.join("");



}


// const cartNum = document.querySelector(".cart");
//   let count = itemList.length;
//   cartNum.innerHTML = count;
