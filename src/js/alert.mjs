// import { getData } from "./productData.mjs";

export default async function alertList(day = "friday", banner = "sunrise", selector = ".divider") {
  const elm = document.querySelector(selector);

  try {
    const alerts = await getAlert("alert");

    if (alerts[day] && alerts[day][banner]) {
      let alertSec = document.querySelector("alert-list");

      if (!alertSec) {
        alertSec = document.createElement("section");
        alertSec.className = "alert-list";
        setAlert(day, banner, alerts, alertSec);
        elm.prepend(alertSec);
      }

      
    }
  } catch (err) {
    console.error("Error getting alerts:", err);
    // return;
  }
}

function setAlert(day, banner, data, parentElm) {
  try {
    const p = document.createElement("p");
    let checkAlerts = 0;

    while (checkAlerts <= 1) {
      if (day === "friday" || day === "saturday" || day === "sunday") {
        if (checkAlerts <= 0) {
          p.className = data[day][banner].layout;
          p.textContent = data[day][banner].message;
          checkAlerts++;
          continue;
        }
        const q = document.createElement("p");
        q.className = data["weekend"]["daytime"].layout; 
        q.textContent = data["weekend"]["daytime"].message;
        parentElm.appendChild(q);
      } else {
        p.className = data[day]["daytime"].layout; 
        p.textContent = data[day]["daytime"].message;
        checkAlerts++;
      }
      parentElm.appendChild(p);
      checkAlerts++;
    }
      

    
  } catch (error) {
    console.error("setAlert function failed.");
    return;
  }
}

function getAlert(category = "tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// const currentAlerts = alertTime();
// alertList(currentAlerts.currentDay, currentAlerts.timeOfDay);
// alertList();