// a literal expression, With strict mode, you can not use undeclared variables to write cleaner code.
"use strict";
let page = 0;

function searchContent() {
  let keyword = document.getElementById("keyword").value;
  if (!keyword) {
    alert("請輸入關鍵字搜尋景點");
    let query = null;
  } else {
    let page = 0;
    let query = `&keyword=${keyword}`;
    fetch(`/api/attractions?page=${page + query}`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        let searchResult = document.createElement("div");
        searchResult.id = "mainContainer";
        searchResult.className = "mainContainer";
        document.getElementById("mainContainer").innerHTML = null;
        for (let i = 0; i < 12; i++) {
          if (!result.data[i]) {
            let noMore = document.createElement("div");
            noMore.id = "noMore";
            noMore.className = "noMore";
            document.getElementById("mainContainer").appendChild(noMore);
            let nMoreNode = document.createTextNode(
              `以上是全部符合${keyword}的景點`
            );
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
      });
  }
}

function webContent() {
  let query = null;
  fetch(`/api/attractions?page=${page + query}`, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((result) => {
      for (let i = 0; i < 12; i++) {
        if (!result.data[i]) {
          break;
        } else {
          let attractions = document.createElement("a");
          attractions.id = "attraction-" + (i + 12 * page);
          attractions.className = "attractions";
          // attractions.href = `/attraction/${i + 1}`;
          attractions.href = `/attraction/${result.data[i].id}`;
          document.getElementById("mainContainer").appendChild(attractions);

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
    });
}
//--------------------------------------------------------------------
//訂變數 選定拿來算位置的對象
let main = document.getElementById("main");
let body = document.getElementById("body");
let bodyBottom = body.getBoundingClientRect().bottom;
let mainBottom = main.getBoundingClientRect().bottom;
// ---------------------------addEventListener
//監聽 scroll 事件，並利用 getBoundingClientRect() 計算元素和可視範圍的相對位置。
// element.addEventListener(event, function, useCapture)
// window.addEventListener("scroll", throttle());
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
// element.scrollHeight - element.scrollTop === element.clientHeight
function loadMore() {
  // if (mainBottom < main.clientHeight + 104 + 55 + 10) {
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
        console.log(`before/after loading page=${page}`);
        webContent();
      }
    }
  }
}
