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
}

function deleteOrder() {}

//model
async function authentication(access_token) {
  let response = await fetch("/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "access_token": access_token
    },
  });
  let status = await response.json();
  if (status.data != null) {
    document.getElementById("authenticate").innerHTML = "登出";
    document.getElementById("authenticate").id = "logoutBtn";
    document.getElementById("logoutBtn").addEventListener("click", logout);
  }
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
  let response = await fetch(`/api/booking`, {
    method: "GET",
    hearders: { "Content-Type": "application/json" },
  });
  let result = await response.json();
  return result;
}

//view
function renderOrder() {
  document.getElementById("userName").innerHTML = `${status.name}`;
  document.getElementById("attractionImg").src = `${result.image}`;
  document.getElementById("attractionName").innerHTML = `${result.name}`;
  document.getElementById("date").id = `${result.name}`;
  document.getElementById("time").id = `${result.name}`;
  document.getElementById("price").id = `${result.name}`;
  document.getElementById("address").id = `${result.name}`;
}

init();
document.getElementById("iconDel").addEventListener("click", deleteOrder);
