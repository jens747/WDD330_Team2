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

// Show a half-transparent DIV to "shadow" the page
// (the form is not inside, but near it, because it shouldn't be half-transparent)
function openNewsletter() {
  let nlContainer = document.createElement("div");
  nlContainer.id = "newsletter-container";

  // make the page unscrollable while the modal form is open
  document.body.style.overflowY = "hidden";

  document.body.append(nlContainer);
  nlContainer.style.display = "block";
}

function closeNewsletter() {
  document.querySelector("#newsletter-container").remove();
  document.body.style.overflowY = "";
}

// function showPrompt(callback) {
function showPrompt() {
  openNewsletter();
  let form = document.querySelector(".newsletter-form");
  let nlClose = document.querySelector("#newsletter-close");
  let nlModal = document.querySelector(".newsletter-modal");
  document.body.append(nlModal);
  nlModal.style.display = "flex";

  function complete(value) {
    closeNewsletter();
    nlModal.style.display = "none";
    document.onkeydown = null;
    // callback(value);
    console.log(value);
  }

  form.onsubmit = function() {
    addThanks();
    
    let value = form.email.value;

    if (value == "") return false; // ignore empty submit
  
    setLocalStorage("newsletter", {
      "email": value
    });
    complete(value);
    return false;
  };

  nlClose.addEventListener("click", function() {
    complete(null);
  });

  form.elements[1].focus();
}

const nlo = document.querySelector("#newsletter-open")

nlo.onclick = function() {
  nlo.style.display = "none";
  showPrompt();
};

function addThanks() {
  const mission = document.querySelector(".mission");

  // Create a new div element
  const thanks = document.createElement("section");
  thanks.id = "thanks-container";

  const nlThanks = document.createElement("div");
  nlThanks.id = "newsletter-thanks";
  nlThanks.textContent = "You're on the list!";

  thanks.appendChild(nlThanks);

  // Append the new div to the parent of mission
  mission.parentNode.insertBefore(thanks, mission.nextSibling);
  
  thanks.style.display = "block";
}
