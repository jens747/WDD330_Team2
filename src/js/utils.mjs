// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const template = await templateFn(data);
  parentElement.insertAdjacentHTML(position, template);
  if (callback) {
    callback(data);
  }
  updateCart();
}

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");

  const header = document.querySelector("#mainHeader");
  const footer = document.querySelector("#mainFooter");

  renderWithTemplate(headerTemplateFn, header);
  renderWithTemplate(footerTemplateFn, footer);
}

export function updateCart() {
  const cartCount = document.querySelector(".cart-count");

  let itemList = getLocalStorage("so-cart");
  let count = itemList.length;
  cartCount.innerHTML = count;

  if (count == 0) {
    cartCount.style.display = "none";
  } else {
    cartCount.style.display = "block";
  }
}

// export function alertMessage(message, scroll = true) {
//   const mainDiv = document.querySelector("divider");
//   const checkoutError =  `
//     <section class="checkout-error">
//       <p>${message}</p>
//       <p>X</p>
//     </section>`; 

//   mainDiv.innerHTML = checkoutError;
//   document.querySelector("checkout-error").scrollIntoView(true);
// }

export function alertMessage(message, scroll = true) {
  const checkoutError =  `
     <section class="checkout-error">
       <p>${message}</p>
       <p>X</p>
     </section>`; 

  // add the alert to the top of main
  const main = document.querySelector("main");
  main.prepend(checkoutError);

  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  checkoutError.addEventListener("click", function() {
    main.removeChild(this);
  });
  
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll)
    window.scrollTo(0,0);

}