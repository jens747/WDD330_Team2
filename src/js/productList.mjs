// import { getData } from "./productData.mjs"
import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // if (product.Id !== "989CG" && product.Id !== "880RT") {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <picture>
      <source media="(min-width: 900px)" srcset="${product.Images.PrimaryExtraLarge}">
      <source media="(min-width: 720px)" srcset="${product.Images.PrimaryLarge}">
      <source media="(min-width: 540px)" srcset="${product.Images.PrimaryMedium}">
      <img src="${product.Images.PrimarySmall}" alt="Image of ${product.Name}">
    </picture>
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`; 
  // }
}

export default async function productList(category, selector, sortBy = "none") {
  const elm = document.querySelector(selector);
  const data = await getProductsByCategory(category);
  sortData(data, sortBy);
  // console.log(data);
  renderListWithTemplate(productCardTemplate, elm, data);
  document.querySelector(".title").innerHTML = `${category} → ${data.length}`;
}

function sortData(data, sortBy) {
  if (sortBy == "none") {
    return data;
  } else if (sortBy == "name") {
    data.sort(sortByName);
    return data;
  } else if (sortBy == "price") {
    data.sort(sortByPrice);
    return data;
  }
}

function sortByName(a, b) {
  let x = a.NameWithoutBrand.toLowerCase();
  let y = b.NameWithoutBrand.toLowerCase();
  if (x < y) {return -1;}
  if (x > y) {return 1;}
  return 0;
}

function sortByPrice(a, b) {
  let x = a.ListPrice;
  let y = b.ListPrice;
  if (x < y) {return -1;}
  if (x > y) {return 1;}
  return 0;
}

// function renderList(dataList, selector) {
//   const elm = document.querySelector(selector);
//   // const htmlItems = dataList.map((product) => productCardTemplate(product));
//   // document.querySelector(selector).innerHTML = htmlItems.join("");
  
// }