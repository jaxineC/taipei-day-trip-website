import { getData, fetchData } from "./Model/model.js";
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
    document.getElementById("inputName").value = `${status.data.name}`;
    document.getElementById("inputEmail").value = `${status.data.email}`;
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

async function authentication() {
  let status = await getData("/api/user", "GET");
  return status;
}

async function logout() {
  let result = await fetchData("/api/user", "DELETE", false);
  renderLogout();
  setTimeout(popupClose, 1000);
  window.location.href = "/";
  return logoutResult;
}

async function deleteOrder() {
  let result = await fetchData("/api/booking", "DELETE", false);
  renderNoOrder();
}

async function getOrder() {
  let result = await getData("/api/booking", "GET");
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
  let addNode = document.createElement("div");
  addNode.className = "popupContainer";
  addNode.id = "popupContainer";
  document.getElementById("body").appendChild(addNode);
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
