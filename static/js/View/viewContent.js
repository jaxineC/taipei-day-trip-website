export let loginContent = `<div id="popupContainer" class="popupContainer">
  <div id="popupBackground" class="popupBackground"></div>
  <div id="popupBox" class="popupBox">
    <div id="stripe" class="stripe"></div>
    <img id="popupClose" class="popupClose" src="/icon/icon_close.png"/>
    <div class="Header3 Bold popupTitle">登入會員帳號</div>
    <div>
      <input id="email" class="Body popupInput email" type="email" name="email" placeholder="輸入電子信箱" required><img class="ok" src="icon/icon_check.png"></img>
      <br/>
      <input id="password" class="Body popupInput password" type="password" name="email" placeholder="輸入密碼" required><img class="ok" src="icon/icon_check.png"></img>
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
      <input id="name" class="Body popupInput name" type="text" name="email" placeholder="輸入姓名" required><img class="ok" src="icon/icon_check.png"></img>
      <input id="email" class="Body popupInput email" type="email" name="email" placeholder="輸入電子信箱" required><img class="ok" src="icon/icon_check.png"></img>
      <br/>
      <input id="password" class="Body popupInput password" type="password" name="email" placeholder="輸入密碼" required><img class="ok" src="icon/icon_check.png"></img>
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

export let promptContent = `<div id="popupContainer" class="popupContainer">
  <div id="popupBackground" class="popupBackground"></div>
  <div id="popupBox" class="popupBox">
    <div id="stripe" class="stripe"></div>
    <img id="popupClose" class="popupClose" src="/icon/icon_close.png"/>
    <div class="Header3 Bold popupTitle">輸入錯誤</div>
    <div id="popupMsg" class="popupMsg"></div>
    <div  id="popupA" class="popupA">視窗關閉，請繼續操作 </div>
  </div>
</div>`;

export let bookingContent = `
    <img id="attractionImg" class="orderImage"></img>
    <div id="orderInfo" class="orderInfo">
      <div id="orderName" class="orderName Body Bold Teal">台北一日遊：<span id="attractionName"></span></div>
      <div id="orderDate" class="orderTxt Body Bold">日期：<span id="date" class="Reg">YYYY-MM-DD</span></div>
      <div id="orderTime" class="orderTxt Body Bold">時間：<span id="time" class="Reg">時段</span></div>
      <div id="orderPrice" class="orderTxt Body Bold">費用：<span class="Reg">新台幣 <sapn id="price">----</sapn> 元</span></div>
      <div id="orderAddress" class="orderTxt Body Bold">地點：<span id="address" class="Reg">地址</span></div>
    </div>
    <img src="/icon/icon_delete.png" id="iconDel" class="iconDel"></img>
`;
