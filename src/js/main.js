import productList from "./productList.mjs";
import alertList from "./alert.mjs";
import alertTime from "./alerttime.mjs";
import { loadHeaderFooter } from "./utils.mjs";

productList();

loadHeaderFooter();

// jj--add-customizable-alert-to-index.html trello card
const currentAlerts = alertTime();
alertList(currentAlerts.currentDay, currentAlerts.timeOfDay);
//
