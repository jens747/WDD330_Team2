import { login } from "./auth.mjs";
import { getParam, loadHeaderFooter, setLocalStorage } from "./utils.mjs";


loadHeaderFooter();

let param = getParam("redirect");

document.querySelector("#login")?.addEventListener("click", login)
document.querySelector("#login")?.addEventListener("click", preventDefault())

async function getLogin() {
    let username = document.getElementById("username")?.value;
    let password = document.getElementById("password")?.value;
    console.log("username", username, password, param)
    let creds = { "username": username, "password": password }
    login(creds, param)
}