import alertList from "./alert.mjs";
import alertTime from "./alerttime.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { newUserCheck } from "./register.mjs";

// jj--call-to-action-register-with-site
newUserCheck();
// 

loadHeaderFooter();

// jj--add-customizable-alert-to-index.html trello card
const currentAlerts = alertTime();
alertList(currentAlerts.currentDay, currentAlerts.timeOfDay);
// 