// a literal expression, With strict mode, you can not use undeclared variables to write cleaner code.
"use strict";

let page = 0;
function webContent() {
  // if (nextPage == null) {
  //   break;
  // }
  // let keyword = document.getElementById("keyword");
  // if (keyword != "") {
  //   let query = `&keyword=${keyword}`;
  // } else {
  //   let query = "";
  // }
  let query = "";
  // fetch("http://52.20.252.232:3000/api/attractions", {
  fetch(`http://192.168.1.103:3000/api/attractions?page=${page + query}`, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify(`{
    //   "page": ${page},
    //   "keyword": ${keyword})`
  })
    .then((response) => response.json())
    .then((result) => {
      // let txt = res.json();
      // let objectTxt = JSON.parse(txt);
      // data.JSON.parse();
      // let page = 0;

      for (let i = 0; i < 12; i++) {
        //appendchild 8 containers "attractions" uder mainContainer

        // if (!result.data[i].images) {
        //   let noMore = document.createElement("div");
        //   noMore.appendChild("No More Result");
        //   break;
        // } else {
        // }

        let attractions = document.createElement("div");
        attractions.id = "attraction-" + (i + 12 * page);
        attractions.className = "attractions";
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
      return (page = result.nextPage);
    });
}

// let scroller = document.createElement("div");
// scroller.id = "scroller";
// document.getElementById("main").appendChild(scroller);

// let output = document.createTextNode("text");
// output.id = "output";
// document.getElementById("scroller").appendChild(output);

//--------------------------------------------------------------------
//監聽 scroll 事件，並利用 getBoundingClientRect() 計算元素和可視範圍的相對位置。
// element.addEventListener(event, function, useCapture)
// element.scrollHeight - element.scrollTop === element.clientHeight

let body = document.getElementById("body");
let rec = body.getBoundingClientRect().bottom;

// alert(window.document.getBoundingClientRect().bottom);

function scroll() {
  let lastMove = 0;
  if (Date.now() - lastMove > 3) {
    alert("test");
    let bodyBottom = body.getBoundingClientRect().bottom;
    if (bodyBottom > body.clientHeight + 100) {
      break;
    } else {
      webContent();
    }
    lastMove = Date.now();
  }

  // while (true) {
  //   let bodyBottom = body.getBoundingClientRect().bottom;
  //   if (bodyBottom > body.clientHeight + 100) break;
  //   webContent();
  // }
}

window.addEventListener("scroll", scroll());

// alert(`body.getBoundingClientRect().bottom=${rec}`);

// body.addEventListener("scroll", function (event) {
//   // let element = body.target;
//   if (body.scrollHeight - body.scrollTop === window.clientHeight) {
//     alert(`scrollHeight:${body.scrollHeight}&scrollTop:${body.scrollTop}`);
//   }
// });

//--------------------------------------------------------------------
