// Array to format weekday names
const weekdays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

// Get new date
const currentDateAndTime = new Date();

// Function to format current time
export default function alertTime() {
  // Get current day, hour, time of day
  let timeframe = {
    currentDay: weekdays[currentDateAndTime.getDay()], 
    currentHour: currentDateAndTime.getHours(),
    timeOfDay: ""
  };

  if (timeframe.currentHour > 5 && timeframe.currentHour < 8) {
    timeframe.timeOfDay = "sunrise";
  }
  else if (timeframe.currentHour > 8 && timeframe.currentHour < 19) {
    timeframe.timeOfDay = "daytime";
  }
  else if (timeframe.currentHour > 5) {
    timeframe.timeOfDay = "nighttime";
  }
  else {
    timeframe.timeOfDay = "midnight";
  }

  // Return formatted string of time
  return timeframe;
};

// // Create a variable for the meeting banner
// const alertBanner = document.querySelector(".alert-banner");

// // Add an event listener to run when the website has loaded
// window.addEventListener("load", () => {
//   // displays the banner on Monday's and Tuesday's
//   if (currentDateAndTime.getDay() < 7 && 
//     currentDateAndTime.getDay() > 5) {
//     alertBanner.style.display = "blowout";
//   }
// }, false);
