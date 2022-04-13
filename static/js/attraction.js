import { getData, fetchData } from "./Model/model.js";
import { clearContent } from "./View/view.js";
import {
  renderPopupWindow,
  renderPopupMsg,
  popupClose,
} from "./View/viewPopup.js";
import {
  loginContent,
  signupContent,
  logoutContent,
  promptContent,
} from "./View/viewContent.js";

//declare global variables
let index = 0;
let imagesList;
let time = "morning";
let price = 2000;
//controller-----------------------------------------------------------------------controller
async function init() {
  load();
  let status = await authentication();
  if (status.data != null) {
    renderLogoutBtn();
  } else {
    document.getElementById("LoginBtn").addEventListener("click", renderLogin);
  }
}

function morning() {
  document.getElementById("price").innerHTML = "2000";
  document.getElementById("dotMorning").style.background = "#448899";
  document.getElementById("dotAfternoon").style.background = "white";
  let url = new URL("https://example.com?foo=1&bar=2");
  time = "morning";
  price = 2000;
}

function afternoon() {
  document.getElementById("price").innerHTML = "2500";
  document.getElementById("dotMorning").style.background = "white";
  document.getElementById("dotAfternoon").style.background = "#448899";
  time = "afternoon";
  price = 2500;
}

async function booking() {
  let status = await authentication();
  if (status.data != null) {
    let date = document.getElementById("date").value;
    let result = await postOrder();
    if (!date) {
      renderPrompt();
      renderPopupMsg(result.error, result.message);
    } else {
      window.location.href = "/booking";
    }
  } else {
    renderLogin();
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

async function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let bodyData = `{"email": "${email}", "password": "${password}"}`;
  let result = await fetchData("/api/user", "PATCH", bodyData);
  if (result.error) {
    renderPopupMsg(result.error, result.message);
  } else {
    renderPopupMsg(false, "歡迎");
    setTimeout(popupClose, 1000);
    authentication();
    renderLogoutBtn();
  }
}

async function signup() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let bodyData = `{
    "name": "${name}",
    "email": "${email}",
    "password": "${password}"
  }`;
  let result = await fetchData("/api/user", "POST", bodyData);
  if (result.error) {
    renderPopupMsg(result.error, result.message);
  } else {
    renderPopupMsg(false, "註冊成功，請登入繼續");
    setTimeout(renderLogin, 1000);
    authentication();
  }
}

async function logout() {
  let result = await fetchData("/api/user", "DELETE", false);
  renderLogout();
  setTimeout(popupClose, 1000);
  setTimeout(window.location.reload.bind(window.location), 1000);
}

async function postOrder() {
  let date = document.getElementById("date").value;
  let attractionId = window.location.pathname.replace("/attraction/", "");
  let bodyData = `{
    "attractionId": "${attractionId}", 
    "date": "${date}",
    "time": "${time}",
    "price": ${price}}`;

  let result = await fetchData("/api/booking", "POST", bodyData);
  return result;
}

//view-----------------------------------------------------------------------view
async function load() {
  let attractionId = window.location.pathname.replace("/attraction/", "");
  let url = `/api/attraction/${attractionId}`;
  let result = await getData(url, "GET");
  document.getElementById("image-0").src = result.data.images[0];
  document.getElementById("name").innerHTML = result.data.name;
  document.getElementById("category").innerHTML = result.data.category;
  document.getElementById("mrt").innerHTML = result.data.mrt;
  document.getElementById("description").innerHTML = result.data.description;
  document.getElementById("address").innerHTML = result.data.address;
  document.getElementById("transport").innerHTML = result.data.transport;
  let length = result.data.images.length;
  for (let i = 0; i < length; i++) {
    let newCircle = document.createElement("div");
    newCircle.className = "circle";
    newCircle.id = `circle-${i}`;
    document.getElementById("circles").appendChild(newCircle);
  }
  document.getElementById(`circle-${index}`).classList.add("current");
  return (imagesList = result.data.images);
}

function renderLogoutBtn() {
  document.getElementById("LoginBtn").innerHTML = "登出";
  document.getElementById("LoginBtn").id = "logoutBtn";
  document.getElementById("logoutBtn").addEventListener("click", logout);
}

function next() {
  let total = imagesList.length;
  if (index === total - 1) {
    document.getElementById(`circle-${index}`).classList.remove("current");
    index = 0;
    document.getElementById("image-0").src = imagesList[index];
    document.getElementById(`circle-${index}`).classList.add("current");
    return index;
  } else {
    document.getElementById("image-0").src = imagesList[index + 1];
    document.getElementById(`circle-${index}`).classList.remove("current");
    index++;
    document.getElementById(`circle-${index}`).classList.add("current");
    return index;
  }
}

function prev() {
  let total = imagesList.length;
  if (index > 0) {
    document.getElementById("image-0").src = imagesList[index - 1];
    document.getElementById(`circle-${index}`).classList.remove("current");
    index--;
    document.getElementById(`circle-${index}`).classList.add("current");
    return index;
  } else {
    document.getElementById(`circle-${index}`).classList.remove("current");
    index = total - 1;
    document.getElementById("image-0").src = imagesList[index];
    document.getElementById(`circle-${index}`).classList.add("current");
    return index;
  }
}

function renderLogin() {
  renderPopupWindow(loginContent);
  document
    .getElementById("renderSignUp")
    .addEventListener("click", renderSignUp);
  document.getElementById("login").addEventListener("click", login);
  document.getElementById("popupClose").addEventListener("click", popupClose);
}

function renderSignUp() {
  renderPopupWindow(signupContent);
  document.getElementById("renderLogin").addEventListener("click", renderLogin);
  document.getElementById("signup").addEventListener("click", signup);
  document.getElementById("popupClose").addEventListener("click", popupClose);
}

function renderLogout() {
  renderPopupWindow(logoutContent);
  document.getElementById("popupClose").addEventListener("click", popupClose);
}

function renderPrompt() {
  renderPopupWindow(promptContent);
  document.getElementById("popupClose").addEventListener("click", popupClose);
  setTimeout(popupClose, 2000);
}

init();
document.getElementById("leftArrow").addEventListener("click", prev);
document.getElementById("rightArrow").addEventListener("click", next);
document.getElementById("dotMorning").addEventListener("click", morning);
document.getElementById("dotAfternoon").addEventListener("click", afternoon);
document.getElementById("booking").addEventListener("click", booking);
document
  .getElementById("quickBookingBtn")
  .addEventListener("click", quickBooking);
