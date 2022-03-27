// a literal expression, With strict mode, you can not use undeclared variables to write cleaner code.
// "use strict";
import { fetchData } from "./Model/model.js";
let page = 0;
let query = null;
let popup_window = null;
let access_token;

//Model
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
    setTimeout(closePopup, 1000);
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
  setTimeout(closePopup, 1000);
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

function clearContent() {
  let searchResult = document.createElement("div");
  searchResult.id = "mainContainer";
  searchResult.className = "mainContainer";
  document.getElementById("mainContainer").innerHTML = null;
}

function renderLogin() {
  let login = document.createElement("div");
  login.className = "popupContainer";
  login.id = "popupContainer";
  document.getElementById("body").appendChild(login);
  document.getElementById("popupContainer").innerHTML = loginContent;
}

function renderSignUp() {
  let signup = document.createElement("div");
  signup.className = "popupContainer";
  signup.id = "popupContainer";
  document.getElementById("body").appendChild(signup);
  document.getElementById("popupContainer").innerHTML = signupContent;
}

function renderLogout() {
  let signup = document.createElement("div");
  signup.className = "popupContainer";
  signup.id = "popupContainer";
  document.getElementById("body").appendChild(signup);
  document.getElementById("popupContainer").innerHTML = logoutContent;
}

function renderPopupMsg(error, msg) {
  if (error) {
    document.getElementById("popupMsg").innerHTML = `${msg}`;
  } else {
    document.getElementById("popupMsg").innerHTML = `${msg}`;
  }
}

function closePopup() {
  document.getElementById("popupContainer").remove();
}

//Controler
function newSearch() {
  clearContent();
  checkSearch();
  searchContent();
}

let x = 0;
let y = 0;
function init() {
  let query = null;
  renderContent(page, query);
  authentication();
}

function searchContent() {
  let keyword = document.getElementById("keyword").value;
  let query = `&keyword=${keyword}`;
  renderContent(query);
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

//--------------------------------------------------------------------
//訂變數 選定拿來算位置的對象
let body = document.getElementById("body");
// ---------------------------addEventListener
//監聽 scroll 事件，並利用 getBoundingClientRect() 計算元素和可視範圍的相對位置。
window.addEventListener("scroll", debounce(loadMore, 100));
// ---------------------------avoid triggering scroll continously
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
function throttle() {
  let lastMove = 0;
  if (Date.now() - lastMove > 3) {
    test();
    lastMove = Date.now();
  }
}
// ---------------------------scroll triggers webContent if user at bottom
function loadMore() {
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
          renderContent(query);
        } else {
          let keyword = document.getElementById("keyword").value;
          let query = `&keyword=${keyword}`;
          searchContent();
        }
      }
    }
  }
}

//--------------------------------------------------
let loginContent = `<div id="popupContainer" class="popupContainer">
  <div id="popupBackground" class="popupBackground"></div>
  <div id="popupBox" class="popupBox">
    <div id="stripe" class="stripe"></div>
    <img id="closePopup" class="popupImg" src="icon/icon_close.png"/>
    <div class="Header3 Bold popupTitle">登入會員帳號</div>
    <div>
      <input id="email" class="Body popupInput email" type="email" name="email" placeholder="輸入電子信箱">
      <br/>
      <input id="password" class="Body popupInput password" type="password" name="email" placeholder="輸入密碼">
      <button onclick="login()" class="popupBoxBtn Button">登入帳戶</button>
      <br/>
      <div id="popupMsg" class="popupMsg"></div>
      <div  id="popupA" class="popupA"><a onclick="renderSignUp()">還沒有帳戶？點此註冊</a></div>
    </div>
  </div>
</div>`;

let signupContent = `<div id="popupContainer" class="popupContainer">
  <div id="popupBackground" class="popupBackground"></div>
  <div id="popupBox" class="popupBox">
    <div id="stripe" class="stripe"></div>
    <img id="closePopup" class="popupImg" src="icon/icon_close.png"/>
    <div class="Header3 Bold popupTitle">註冊會員帳號</div>
    <div>
      <input id="name" class="Body popupInput name" type="text" name="email" placeholder="輸入姓名">
      <input id="email" class="Body popupInput email" type="email" name="email" placeholder="輸入電子信箱">
      <br/>
      <input id="password" class="Body popupInput password" type="password" name="email" placeholder="輸入密碼">
      <button onclick="signup()" class="popupBoxBtn Button">註冊新帳戶</button>
      <br/>
      <div id="popupMsg" class="popupMsg"></div>
      <div  id="popupA" class="popupA"><a onclick="renderLogin()">已經有帳戶了？點此登入</a></div>
    </div>
  </div>
</div>`;

let logoutContent = `<div id="popupContainer" class="popupContainer">
  <div id="popupBackground" class="popupBackground"></div>
  <div id="popupBox" class="popupBox">
    <div id="stripe" class="stripe"></div>
    <img id="closePopup" class="popupImg" src="icon/icon_close.png"/>
    <div class="Header3 Bold popupTitle">成功登出</div>
    <div id="popupMsg" class="popupMsg"></div>
    <div  id="popupA" class="popupA">重新載入</div>
  </div>
</div>`;

init();
document.getElementById("authenticate").addEventListener("click", renderLogin);
document.getElementById("searchBtn").addEventListener("click", newSearch);
