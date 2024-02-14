import productList from "./productList.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category");
productList(category, ".product-list");