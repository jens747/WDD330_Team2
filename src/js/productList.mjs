import { getData } from "./productData.mjs"
import { renderListWithTemplate } from "./utils.mjs";

// export default async function productList(category = "tents", selector=".product-list") {
//     const data = await getData(category);
//     renderList(data, selector);
//     renderListWithTemplate(productCardTemplate, el, products);
// }


function productCardTemplate(product) {
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

export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  // get the list of products
  const products = await getData(category);
  console.log(products);
  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, el, products);
}

// function renderList(productList, selector) {
//     const htmlItems = productList.map((product) => productCardTemplate(product));
//     document.querySelector(selector).innerHTML = htmlItems.join("");
// }

// function cartTotal(selector = ".carts") {
//   var productList = getData(selector);
//   var totalItems = 0;
//   for(var i = 0;i<productList.length;i++)
//   {
//     totalItems+=(productList[i].quantity);
//   }
//   return totalItems;
// }
