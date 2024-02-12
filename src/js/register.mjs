import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { renderWithTemplate, setClick } from "./utils.mjs";

// Check to see if user has registered
export function newUserCheck() {
  const r = getLocalStorage("registered");
  if (!r || r.name === "" || r.email === "") {
    // Clear data if user has not completed registration 
    localStorage.removeItem("registered");
    // Take user through registration
    activateModal();
  }
}

// Remove registration modal if user declines registration
function closeModal() {
  document.querySelector("#register-name").value = "declined";
  document.querySelector("#register-email").value = "declined@example.com";
  document.querySelector("#registered").click();
}

// Gets user input and saves to localStorage
function registerUser() {
  const userName = document.querySelector("#register-name").value;
  const userEmail = document.querySelector("#register-email").value;
  
  setLocalStorage("registered", {
    "name": userName,
    "email": userEmail
  });
}

// export function verifyRegistration() {
//   const thanksContainer = document.querySelector("#thanks-container");
//   thanksContainer.style.display = "flex";
//   thanksContainer.classList.add("register-fade");
//   thanksContainer.addEventListener("animationend", () => {
//     thanksContainer.style.display = "none";
//   });
// }

// Add event listeners to modal buttons
function activateModal() {
  const modalParent = document.querySelector(".divider");
  
  renderWithTemplate(renderModal, modalParent, undefined, () => {
    // Add eventlisteners after modal is created
    setClick("#registered", registerUser);
    setClick("#not-registered", closeModal);
  });
  // Source: https://www.30secondsofcode.org/js/s/arrow-function-event-listeners/
}

// Create registration modal
function renderModal() {
  return `
      <section class="register-modal">
      <h2>Welcome!</h2>
      <p id="message-modal">Please fill out the form if you wish to register. </p>
      <form class="register-form">
        <fieldset>
          <legend>Account Registration</legend>
          <label class="register-label"
            ><span class="label-span">Name </span
            ><input type="text" id="register-name" name="name" autofocus required
          /></label>
          <label class="register-label"
            ><span class="label-span">Email </span
            ><input
              type="email"
              id="register-email"
              name="email" required
              placeholder="email@example.com"
          /></label>
        </fieldset>

        <input type="submit" value="Register" class="modal-btn" id="registered" />
        <button class="modal-btn" id="not-registered">No Thanks</button>
      </form>
    </section>
    <section id="thanks-container">
      <div id="register-thanks">Thank you for registering!</div>
    </section>
  `
}
