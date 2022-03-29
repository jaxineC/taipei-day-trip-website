import { renderPopupMsg, popupClose } from "./View/viewPopup.js";
import {
  loginContent,
  signupContent,
  logoutContent,
} from "./View/viewContent.js";

let status = {};

//control
function init() {
  load();
  authentication();
  renderOrder();
}

function deleteOrder() {}

//model
async function authentication(access_token) {
  let response = await fetch("/api/user", {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  });
  let status = await response.json();
  if (status.data != null) {
    document.getElementById("authenticate").innerHTML = "登出";
    document.getElementById("authenticate").id = "logoutBtn";
    document.getElementById("logoutBtn").addEventListener("click", logout);
  }
  document.getElementById("userName").innerHTML = `${status.data.name}`;
  return status;
}

async function logout() {
  localStorage.removeItem("jwt");
  let response = await fetch("/api/user", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  let signupResult = await response.json();
  renderLogout();
  setTimeout(popupClose, 1000);
  setTimeout(window.location.reload.bind(window.location), 1000);
  return logoutResult;
}

async function load() {
  let response = await fetch("/api/booking", {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  });
  let result = await response.json();
  document.getElementById("attractionImg").src = `${result.data.image}`;
  document.getElementById("attractionName").innerHTML = `${result.data.name}`;
  document.getElementById("date").id = `${result.data.name}`;
  document.getElementById("time").id = `${result.data.name}`;
  document.getElementById("price").id = `${result.data.name}`;
  document.getElementById("address").id = `${result.data.name}`;
  return result;
}

//view

init();
document.getElementById("iconDel").addEventListener("click", deleteOrder);
