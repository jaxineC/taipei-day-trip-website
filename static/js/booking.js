import { fetchData } from "./Model/model.js";
import { clearContent } from "./View/view.js";
import { renderPopupMsg, popupClose } from "./View/viewPopup.js";
import {
  loginContent,
  signupContent,
  logoutContent,
} from "./View/viewContent.js";

//declare global variables
//controller-----------------------------------------------------------------------controller
async function init() {
  let status = await authentication();
  if (status.data != null) {
    document.getElementById("userName").innerHTML = `${status.data.name}`;
    let result = await getOrder();
    if (result.data != null) {
      loadOrder(result);
      document.getElementById("iconDel").addEventListener("click", deleteOrder);
    } else {
      renderNoOrder();
    }
  } else {
    window.location.href = "/";
  }
}

async function quickBooking() {
  let status = await authentication();
  if (status.data != null) {
    window.location.href = "/booking";
  } else {
    renderLogin();
  }
}

//model-----------------------------------------------------------------------model
async function authentication(access_token) {
  let response = await fetch("/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let status = await response.json();
  return status;
}

async function logout() {
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

async function deleteOrder() {
  let response = await fetch("/api/booking", {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  });
  let result = await response.json();
  renderNoOrder();
}

async function getOrder() {
  let response = await fetch("/api/booking", {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  });
  let result = await response.json();
  return result;
}

//view-----------------------------------------------------------------------view
function loadOrder(result) {
  if (result.data != null) {
    let date = new Date(result.data.date);
    let [YYYY, MM, DD] = [
      date.getFullYear(),
      date.getMonth().toString().padStart(2, "0"),
      date.getDate().toString().padStart(2, "0"),
    ];
    document.getElementById(
      "attractionImg"
    ).src = `${result.data.attraction.image}`;
    document.getElementById(
      "attractionName"
    ).innerHTML = `${result.data.attraction.name}`;
    document.getElementById("time").innerHTML = `${result.data.time}`;
    document.getElementById("price").innerHTML = `${result.data.price}`;
    document.getElementById("date").innerHTML = `${YYYY}-${MM}-${DD}`;
    document.getElementById(
      "address"
    ).innerHTML = `${result.data.attraction.address}`;
  } else {
    document.getElementById("");
  }

  return result;
}

function renderLogout() {
  let signupObj = document.createElement("div");
  signupObj.className = "popupContainer";
  signupObj.id = "popupContainer";
  document.getElementById("body").appendChild(signupObj);
  document.getElementById("popupContainer").innerHTML = logoutContent;
  document.getElementById("popupClose").addEventListener("click", popupClose);
}

function renderNoOrder() {
  document.getElementById("bookingContainer").innerHTML =
    "目前沒有任何待預訂的行程";
  let footerHeight = window.innerHeight - 215;
  document.getElementById("footer").style.height = `${footerHeight}px`;
  document.getElementById("footer").style.alignItems = "normal";
  document.getElementById("mainContainer").style.margin = "37px 0px 40px 0px";
}

init();
document
  .getElementById("quickBookingBtn")
  .addEventListener("click", quickBooking);

//controller
//model
//view

init();
document.getElementById("logoutBtn").addEventListener("click", logout);
