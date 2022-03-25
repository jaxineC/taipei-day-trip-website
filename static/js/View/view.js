class View {
  async function renderContent(query) {
    // op3: rederContent to call fetch
    let result = await fetchData(query);
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
        // attractions.href = `/attraction/${i + 1}`;
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
  
  // function renderSignUp() {
  //   let signup = document.createElement("div");
  //   signup.className = "popupContainer";
  //   signup.id = "popupContainer";
  //   document.getElementById("body").appendChild(signup);
  //   document.getElementById("popupContainer").innerHTML = signupContent;
  // }
  
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
  
}
