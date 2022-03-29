// a literal expression, With strict mode, you can not use undeclared variables to write cleaner code.
// "use strict";
import { renderPopupMsg, popupClose } from "./View/viewPopup.js";
import {
  loginContent,
  signupContent,
  logoutContent,
} from "./View/viewContent.js";

// alert(window.location.href);
// alert(window.location.pathname);

let index = 0;
let imagesList;
let time = "morning";
let price = 2000;

function init() {
  load();
  authentication();
}

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

function next() {
  let total = imagesList.length;
  // alert(`index=${index};total=${total}`);
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
    // index=+1;--------------->wrong ??????????????@@
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

function morning() {
  document.getElementById("price").innerHTML = "2000";
  document.getElementById("dotMorning").style.background = "#448899";
  document.getElementById("dotAfternoon").style.background = "white";
  let url = new URL("https://example.com?foo=1&bar=2");
  // let params = new URLSearchParams(url.search);
  // params.append('foo', 4);
  // let paramsObj = { time: "morning" };
  // let searchParams = new URLSearchParams(paramsObj);
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

init();
document.getElementById("authenticate").addEventListener("click", renderLogin);
document.getElementById("leftArrow").addEventListener("click", prev);
document.getElementById("rightArrow").addEventListener("click", next);
document.getElementById("dotMorning").addEventListener("click", morning);
document.getElementById("dotAfternoon").addEventListener("click", afternoon);
document.getElementById("booking").addEventListener("click", booking);

//-------------------------------------------------------------------
//Model
async function booking() {
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
  window.location.href = "http://192.168.1.103:3000/booking";
}

async function authentication(access_token) {
  let response = await fetch("/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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

//view
async function renderContent(page, query) {
  let result = await fetchData(page, query);
  for (let i = 0; i < 12; i++) {
    if (!result.data[i]) {
      let noMore = document.createElement("div");
      noMore.id = "noMore";
      noMore.className = "noMore";
      document.getElementById("mainContainer").appendChild(noMore);
      let nMoreNode = document.createTextNode(`沒有更多符合您查找的景點`);
      noMore.appendChild(nMoreNode);
      break;
    } else {
      let attractions = document.createElement("a");
      attractions.id = "attraction-" + (i + 12 * page);
      attractions.className = "attractions";
      attractions.href = `/attraction/${result.data[i].id}`;
      document.getElementById("mainContainer").appendChild(attractions);

      //appendchild 8 containers "attractions" uder mainContainer
      let images = document.createElement("img");
      let url = result.data[i].images[0];
      images.src = url;
      images.id = "attractionImage-" + i;
      images.className = "attractionImage";
      document
        .getElementById("attraction-" + (i + 12 * page))
        .appendChild(images);

      let names = document.createElement("div");
      names.id = "attractionName-" + (i + 12 * page);
      names.className = "attractionName Bold";
      document
        .getElementById("attraction-" + (i + 12 * page))
        .appendChild(names);
      let namesNode = document.createTextNode(result.data[i].name);
      names.appendChild(namesNode);

      let mrts = document.createElement("div");
      mrts.id = "attractionMrt-" + (i + 12 * page);
      mrts.className = "attractionMrt";
      document
        .getElementById("attraction-" + (i + 12 * page))
        .appendChild(mrts);
      let mrtNode = document.createTextNode(result.data[i].mrt);
      mrts.appendChild(mrtNode);

      let cats = document.createElement("div");
      cats.id = "attractionCat-" + i;
      cats.className = "attractionCat";
      document
        .getElementById("attraction-" + (i + 12 * page))
        .appendChild(cats);
      let catNode = document.createTextNode(result.data[i].category);
      cats.appendChild(catNode);
    }
  }
  return (page = result.nextPage);
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
