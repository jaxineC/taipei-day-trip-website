// a literal expression, With strict mode, you can not use undeclared variables to write cleaner code.
"use strict";

// alert(window.location.href);
// alert(window.location.pathname);

let index = 0;
let imagesList;

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

function toggle(event) {
  let x = event.target;
  if (x.id === "dotMorning") {
    document.getElementById("price").innerHTML = "2000";
    document.getElementById("dotMorning").style.background = "#448899";
    document.getElementById("dotAfternoon").style.background = "white";
  } else {
    document.getElementById("price").innerHTML = "2500";
    document.getElementById("dotMorning").style.background = "white";
    document.getElementById("dotAfternoon").style.background = "#448899";
  }
}

//------------------------------------------------user
async function authentication(access_token) {
  let response = await fetch("/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${access_token}}` ...原本也可以
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  let status = await response.json();
  if (status.data != null) {
    document.getElementById("authenticate").innerHTML = "登出";
    document.getElementById("authenticate").setAttribute("onClick", "logout()");
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
      // Authorization: `Bearer ${access_token}}`, ...原本也可以
      // Authorization: `Bearer ${localStorage.getItem('jwt')}` ...官方
    },

    body: JSON.stringify(bodyData),
    // body: `{"email": ${email}, "password": ${password}}`,
    // body: { email: "jx@gmail.com", password: "0000" },
  });
  let loginResult = await response.json();
  localStorage.setItem("jwt", loginResult.access_token);
  // localStorage.setItem("jwt", result.access_token);
  if (loginResult.error) {
    renderPopupMsg(loginResult.error, loginResult.message);
  } else {
    renderPopupMsg(false, "歡迎");
    setTimeout(closePopup, 1000);
    // authentication(loginResult["access_token"]);
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
    // authentication(loginResult["access_token"]);
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

async function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let bodyData = `{"email": "${email}", "password": "${password}"}`;
  let response = await fetch("/api/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${access_token}}`, ...原本也可以
      // Authorization: `Bearer ${localStorage.getItem('jwt')}` ...官方
    },

    body: JSON.stringify(bodyData),
    // body: `{"email": ${email}, "password": ${password}}`,
    // body: { email: "jx@gmail.com", password: "0000" },
  });
  let loginResult = await response.json();
  localStorage.setItem("jwt", loginResult.access_token);
  // localStorage.setItem("jwt", result.access_token);
  if (loginResult.error) {
    renderPopupMsg(loginResult.error, loginResult.message);
  } else {
    renderPopupMsg(false, "歡迎");
    setTimeout(closePopup, 1000);
    // authentication(loginResult["access_token"]);
    authentication();
    return loginResult;
  }
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

//--------------------------------------------------
let loginContent = `<div id="popupContainer" class="popupContainer">
  <div id="popupBackground" class="popupBackground"></div>
  <div id="popupBox" class="popupBox">
    <div id="stripe" class="stripe"></div>
    <img onclick="closePopup()" id="popupImg" class="popupImg" src="icon/icon_close.png"/>
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
    <img onclick="closePopup()" id="popupImg" class="popupImg" src="icon/icon_close.png"/>
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
    <img onclick="closePopup()" id="popupImg" class="popupImg" src="icon/icon_close.png"/>
    <div class="Header3 Bold popupTitle">成功登出</div>
    <div id="popupMsg" class="popupMsg"></div>
    <div  id="popupA" class="popupA">重新載入</div>
  </div>
</div>`;
