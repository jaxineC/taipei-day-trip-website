// a literal expression, With strict mode, you can not use undeclared variables to write cleaner code.
"use strict";
let page = 0;
let query = null;
// let result; //op1:global variables: fetch return result=nono; fetchData(query).then(renderContent);

//Model
async function fetchData(query) {
  let response = await fetch(`/api/attractions?page=${page + query}`, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  });
  let result = await response.json();
  return result;
}

//view
// function renderContent(result) {//op2: fetchData(query).then(renderContent)
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

//Controler
function newSearch() {
  clearContent();
  checkSearch();
  searchContent();
}

function webContent() {
  // let keyword = document.getElementById("keyword").value;
  let query = null;
  // fetchData(query).then(renderContent);
  renderContent(query);
  // renderContent();
}

function searchContent() {
  let keyword = document.getElementById("keyword").value;
  let query = `&keyword=${keyword}`;
  // fetchData(query).then(renderContent);
  renderContent(query);
  // renderContent();
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
// element.addEventListener(event, function, useCapture)
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
          webContent();
        } else {
          let keyword = document.getElementById("keyword").value;
          let query = `&keyword=${keyword}`;
          searchContent();
        }
      }
    }
  }
}
