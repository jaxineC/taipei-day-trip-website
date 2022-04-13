import { getData, fetchData } from "./Model/model.js";
import { clearContent, renderNoOrder, loadOrder } from "./View/view.js";
import {
  renderPopupWindow,
  renderPopupMsg,
  popupClose,
} from "./View/viewPopup.js";
import { logoutContent, bookingContent } from "./View/viewContent.js";

//variables-----------------------------------------------------------------------variables

export let status = { data: {} };
export let result = {};

//controller-----------------------------------------------------------------------controller
async function init() {
  await authentication();
  let queryString = window.location.search.replace("?number=", "");
  document.getElementById("orderNumber").innerHTML = `${queryString}`;
  // if (status.data != null) {
  //   let data = await getData("/api/thankyou", "get");
  //   document.getElementById("orderNumber").innerHTML = `${data.orderNumber}`;
  //   document.getElementById("price").innerHTML = `${data.price}`;
  //   document.getElementById(
  //     "attractionName"
  //   ).innerHTML = `${data.attractionName}`;
  //   document.getElementById("address").innerHTML = `${data.address}`;
  //   document.getElementById("date").innerHTML = `${data.date}`;
  //   document.getElementById("time").innerHTML = `${data.time}`;
  //   document.getElementById("contactName").innerHTML = `${data.contactName}`;
  //   document.getElementById("contactEmail").innerHTML = `${data.contactEmail}`;
  //   document.getElementById(
  //     "contactNumber"
  //   ).innerHTML = `${data.contactNumber}`;
  // } else {
  //   window.location.href = "/";
  // }
}

async function quickBooking() {
  await authentication();
  if (status.data != null) {
    window.location.href = "/booking";
  } else {
    renderLogin();
  }
}

//model-----------------------------------------------------------------------model

async function authentication() {
  status = await getData("/api/user", "GET");
  return status;
}

async function logout() {
  fetchData("/api/user", "DELETE", false);
  renderLogout();
  setTimeout(popupClose, 1000);
  window.location.href = "/";
}

async function getOrder() {
  result = await getData("/api/booking", "GET");
  return result;
}

//view-----------------------------------------------------------------------view

function renderLogout() {
  renderPopupWindow(logoutContent);
  document.getElementById("popupClose").addEventListener("click", popupClose);
}

init();
document
  .getElementById("quickBookingBtn")
  .addEventListener("click", quickBooking);
document.getElementById("logoutBtn").addEventListener("click", logout);
