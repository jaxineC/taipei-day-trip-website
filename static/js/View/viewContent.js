export let loginContent = `<div id="popupContainer" class="popupContainer">
  <div id="popupBackground" class="popupBackground"></div>
  <div id="popupBox" class="popupBox">
    <div id="stripe" class="stripe"></div>
    <img id="popupClose" class="popupClose" src="/icon/icon_close.png"/>
    <div class="Header3 Bold popupTitle">登入會員帳號</div>
    <div>
      <input id="email" class="Body popupInput email" type="email" name="email" placeholder="輸入電子信箱">
      <br/>
      <input id="password" class="Body popupInput password" type="password" name="email" placeholder="輸入密碼">
      <button id="login" class="login popupBoxBtn Button">登入帳戶</button>
      <br/>
      <div id="popupMsg" class="popupMsg"></div>
      <div  id="popupA" class="popupA"><a id="renderSignUp" class="renderSignUp">還沒有帳戶？點此註冊</a></div>
    </div>
  </div>
</div>`;

export let signupContent = `<div id="popupContainer" class="popupContainer">
  <div id="popupBackground" class="popupBackground"></div>
  <div id="popupBox" class="popupBox">
    <div id="stripe" class="stripe"></div>
    <img id="popupClose" class="popupClose" src="/icon/icon_close.png"/>
    <div class="Header3 Bold popupTitle">註冊會員帳號</div>
    <div>
      <input id="name" class="Body popupInput name" type="text" name="email" placeholder="輸入姓名">
      <input id="email" class="Body popupInput email" type="email" name="email" placeholder="輸入電子信箱">
      <br/>
      <input id="password" class="Body popupInput password" type="password" name="email" placeholder="輸入密碼">
      <button id="signup" class="signup popupBoxBtn Button">註冊新帳戶</button>
      <br/>
      <div id="popupMsg" class="popupMsg"></div>
      <div  id="popupA" class="popupA"><a id="renderLogin" class="renderLogin">已經有帳戶了？點此登入</a></div>
    </div>
  </div>
</div>`;

export let logoutContent = `<div id="popupContainer" class="popupContainer">
  <div id="popupBackground" class="popupBackground"></div>
  <div id="popupBox" class="popupBox">
    <div id="stripe" class="stripe"></div>
    <img id="popupClose" class="popupClose" src="/icon/icon_close.png"/>
    <div class="Header3 Bold popupTitle">成功登出</div>
    <div id="popupMsg" class="popupMsg"></div>
    <div  id="popupA" class="popupA">重新載入</div>
  </div>
</div>`;
