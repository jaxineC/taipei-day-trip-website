// import { renderPopupMsg, popupClose } from "./View/viewPopup.js";
// import {
//   loginContent,
//   signupContent,
//   logoutContent,
// } from "./View/viewContent.js";

function init() {
  authentication();
  loadOrder();
  document.getElementById("iconDel").addEventListener("click", deleteOrder);
}

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

async function loadOrder() {
  let response = await fetch("/api/booking", {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  });
  let result = await response.json();
  if (result.data != null) {
    let date = new Date(result.data.date);
    // let [YYYY, MM, DD] = [
    //   date.getFullYear(),
    //   date.getMonth().padStart(2, "0"),
    //   date.getDate().padStart(2, "0"),
    // ];
    let [YYYY, MM, DD] = [
      date.getFullYear(),
      date.getMonth().toString().padStart(2, "0"),
      date.getDate().toString().padStart(2, "0"),
    ];
    // let test = typeof MM;
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

async function deleteOrder() {
  let response = await fetch("/api/booking", {
    method: "DELETE",
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

//controller
//model
//view

init();
