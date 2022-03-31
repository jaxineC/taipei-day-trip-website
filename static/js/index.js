import { fetchData } from "./Model/model.js";
import { clearContent } from "./View/view.js";
import { renderPopupMsg, popupClose } from "./View/viewPopup.js";
import {
  loginContent,
  signupContent,
  logoutContent,
} from "./View/viewContent.js";

//declare global variables
let page = 0;
let query = null;
let popup_window = null;
//controller-----------------------------------------------------------------------controller
async function init() {
  let nextPage = await renderContent(page, query);
  let status = await authentication();
  if (status.data != null) {
    renderLogoutBtn();
  } else {
    document.getElementById("LoginBtn").addEventListener("click", renderLogin);
  }
  return (page = nextPage);
}

function newSearch() {
  clearContent();
  checkSearch();
  searchContent();
}

async function loadMore() {
  if (body.scrollHeight >= document.documentElement.clientHeight) {
    if (
      body.getBoundingClientRect().bottom <=
      document.documentElement.clientHeight
    ) {
      if (page == null) {
        let noMore = document.createElement("div");
        noMore.id = "noMore";
        noMore.className = "noMore";
        document.getElementById("mainContainer").appendChild(noMore);
        let nMoreNode = document.createTextNode("沒有再多景點要載入了");
        noMore.appendChild(nMoreNode);
      } else {
        let keyword = document.getElementById("keyword").value;
        if (keyword == "") {
          let query = null;
          let nextPage = await renderContent(page, query);
          return (page = nextPage);
        } else {
          let keyword = document.getElementById("keyword").value;
          let query = `&keyword=${keyword}`;
          searchContent();
        }
      }
    }
  }
}

async function searchContent() {
  let keyword = document.getElementById("keyword").value;
  let query = `&keyword=${keyword}`;
  let nextPage = await renderContent(page, query);
  return (page = nextPage);
}

function checkSearch() {
  let keyword = document.getElementById("keyword").value;
  if (!keyword) {
    alert("請輸入關鍵字搜尋景點");
    let query = null;
  } else {
    return (page = 0);
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
  if (loginResult.error) {
    renderPopupMsg(loginResult.error, loginResult.message);
  } else {
    renderPopupMsg(false, "歡迎");
    setTimeout(popupClose, 1000);
    authentication();
    renderLogoutBtn();
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
  let response = await fetch("/api/user", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  let signupResult = await response.json();
  renderLogout();
  setTimeout(popupClose, 1000);
  setTimeout(window.location.reload.bind(window.location), 1000);
}

//view-----------------------------------------------------------------------view
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
  return result.nextPage;
}

function renderLogoutBtn() {
  document.getElementById("LoginBtn").innerHTML = "登出";
  document.getElementById("LoginBtn").id = "logoutBtn";
  document.getElementById("logoutBtn").addEventListener("click", logout);
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

// ---------------------------avoid triggering scroll continously
let body = document.getElementById("body");
window.addEventListener("scroll", debounce(loadMore, 100));
function debounce(func, wait) {
  let timeout;

  return function executedFunction() {
    let later = () => {
      clearTimeout(timeout);
      func();
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

init();
document.getElementById("searchBtn").addEventListener("click", newSearch);
document
  .getElementById("quickBookingBtn")
  .addEventListener("click", quickBooking);
