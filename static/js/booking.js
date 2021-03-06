import { getData, fetchData } from "./Model/model.js";
import { clearContent, renderNoOrder, loadOrder } from "./View/view.js";
import {
  renderPopupWindow,
  renderPopupMsg,
  popupClose,
} from "./View/viewPopup.js";
import {
  loginContent,
  signupContent,
  logoutContent,
  bookingContent,
} from "./View/viewContent.js";

//variables-----------------------------------------------------------------------variables

export let status = { data: {} };
export let result = {};

//controller-----------------------------------------------------------------------controller
async function init() {
  await authentication();
  if (status.data != null) {
    document.getElementById("order").innerHTML = bookingContent;
    document.getElementById("userName").innerHTML = `${status.data.name}`;
    let result = await getOrder();
    if (result.data != null) {
      loadOrder(result, status);
      document.getElementById("iconDel").addEventListener("click", deleteOrder);
    } else {
      renderNoOrder();
    }
  } else {
    window.location.href = "/";
  }
}

async function quickBooking() {
  await authentication();
  if (status.data != null) {
    window.location.href = "/booking";
  } else {
    renderLogin();
  }
}

function deleteOrder() {
  fetchData("/api/booking", "DELETE", false);
  renderNoOrder();
}

//model-----------------------------------------------------------------------model

async function authentication() {
  status = await getData("/api/user", "GET");
  // status.data = {
  //   id: data.data.id,
  //   name: data.data.name,
  //   email: data.data.email,
  // };
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
