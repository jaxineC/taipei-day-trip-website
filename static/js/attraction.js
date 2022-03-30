import { fetchData } from "./Model/model.js";
import { clearContent } from "./View/view.js";
import { renderPopupMsg, popupClose } from "./View/viewPopup.js";
import {
  loginContent,
  signupContent,
  logoutContent,
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
    postOrder();
    window.location.href = "/booking";
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

async function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let bodyData = `{"email": "${email}", "password": "${password}"}`;
  let response = await fetch("/api/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(bodyData),
  });
  let loginResult = await response.json();
  localStorage.setItem("jwt", loginResult.access_token);
  if (loginResult.error) {
    renderPopupMsg(loginResult.error, loginResult.message);
  } else {
    renderPopupMsg(false, "歡迎");
    setTimeout(popupClose, 1000);
    authentication();
    return loginResult;
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
  let response = await fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });
  let signupResult = await response.json();
  if (signupResult.error) {
    renderPopupMsg(signupResult.error, signupResult.message);
  } else {
    renderPopupMsg(false, "註冊成功，請登入繼續");
    setTimeout(renderLogin, 1000);
    authentication();
    return signupResult;
  }
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

async function postOrder() {
  let date = document.getElementById("date").value;
  let attractionId = window.location.pathname.replace("/attraction/", "");
  let bodyData = `{
    "attractionId": "${attractionId}", 
    "date": "${date}",
    "time": "${time}",
    "price": ${price}}`;
  let response = await fetch("/api/booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(bodyData),
  });
  let result = response.json();
  return result;
}

//view-----------------------------------------------------------------------view
function load() {
  let attractionId = window.location.pathname.replace("/attraction/", "");
  fetch(`/api/attraction/${attractionId}`, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((result) => {
      document.getElementById("image-0").src = result.data.images[0];
      document.getElementById("name").innerHTML = result.data.name;
      document.getElementById("category").innerHTML = result.data.category;
      document.getElementById("mrt").innerHTML = result.data.mrt;

      document.getElementById("description").innerHTML =
        result.data.description;
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
    });
  // alert(imagesList);------------>undefined ?????????@@
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
  let loginObj = document.createElement("div");
  loginObj.className = "popupContainer";
  loginObj.id = "popupContainer";
  document.getElementById("body").appendChild(loginObj);
  document.getElementById("popupContainer").innerHTML = loginContent;
  document
    .getElementById("renderSignUp")
    .addEventListener("click", renderSignUp);
  document.getElementById("login").addEventListener("click", login);
  document.getElementById("popupClose").addEventListener("click", popupClose);
}

function renderSignUp() {
  let signupObj = document.createElement("div");
  signupObj.className = "popupContainer";
  signupObj.id = "popupContainer";
  document.getElementById("body").appendChild(signupObj);
  document.getElementById("popupContainer").innerHTML = signupContent;
  document.getElementById("renderLogin").addEventListener("click", renderLogin);
  document.getElementById("signup").addEventListener("click", signup);
  document.getElementById("popupClose").addEventListener("click", popupClose);
}

function renderLogout() {
  let signupObj = document.createElement("div");
  signupObj.className = "popupContainer";
  signupObj.id = "popupContainer";
  document.getElementById("body").appendChild(signupObj);
  document.getElementById("popupContainer").innerHTML = logoutContent;
  document.getElementById("popupClose").addEventListener("click", popupClose);
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
