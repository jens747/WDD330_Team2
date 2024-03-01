import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
productList(category, ".product-list");

document.querySelector("#sortByName").addEventListener("click", sortByName);
document.querySelector("#sortByPrice").addEventListener("click", sortByPrice);
document.querySelector("#sortReset").addEventListener("click", sortReset);

function sortByName() {
    productList(category, ".product-list", "name");
}

function sortByPrice() {
    productList(category, ".product-list", "price");
}

function sortReset() {
    productList(category, ".product-list");
}