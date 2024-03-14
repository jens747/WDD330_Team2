import { findProductById } from "./productData.mjs"
import { renderListWithTemplate } from "./utils.mjs";

const searchForm = document.getElementById("product_searchbox");
searchForm.addEventListener("submit", (event) => {
    const searchBar = document.getElementById("searchbar").value;
    event.preventDefault();
    window.location.href = `/product_pages/product-search.html?product=${searchBar}`;
});

function productCardTemplate(product) {
  // if (product.Id !== "989CG" && product.Id !== "880RT") {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`; 
  // }
}

export default async function productList(category, selector) {
  const elm = document.querySelector(selector);
  const data = await findProductById(id);
  renderListWithTemplate(productCardTemplate, elm, data);
  document.querySelector(".productSearchResults").innerHTML = category;
}

// const urlParams = new URLSearchParams(window.location.search);
// const value = urlParams.get("value");
// const pList = document.querySelector("productSearchResults");
// async function main(event) {
//     const url = `import.meta.env.VITE_SERVER_URL=${encodeURI(event)}`;
//     const search = await fetch(`${url}`);
//     const data = await search.json();
//     pList.innerHTML = data.Search.map((product) => productHTML(product)).join("");
// }
// main(value);
// function productHTML(product) {
//     return `<a href="/product_pages/index.html?product=${product.Id}">
//     <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}"/>
//     <h3 class="card__brand">${product.Brand.Name}</h3>
//     <h2 class="card__name">${product.NameWithoutBrand}</h2>
//     <p class="product-card__price">$${product.FinalPrice}</p></a>
//     </li>`
// }