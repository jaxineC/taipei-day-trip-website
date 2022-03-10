// a literal expression, With strict mode, you can not use undeclared variables to write cleaner code.
"use strict";

let page = 0;
function webContent() {
  // if (nextPage == null) {
  //   break;
  // }
  // let keyword = document.getElementById("keyword").value;
  // alert(`${keyword} & type of ${typeof keyword}`);

  // if (keyword == "") {
  //   let query = "";
  //   alert("if");
  // } else {
  //   let query = `&keyword=${keyword}`;
  //   alert("else");
  // }

  let query = "";
  // let query = "";
  // fetch("http://52.20.252.232:3000/api/attractions", {
  fetch(`http://192.168.0.186:3000/api/attractions?page=${page + query}`, {
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
      // alert(
      //   `body.getBoundingClientRect().bottom=${
      //     main.getBoundingClientRect().bottom
      //   }
      //    body.scrollHeight=${body.scrollHeight}
      //    header.sH=${header.scrollHeight}
      //    main.sH=${main.scrollHeight}
      //    footer.sH=${footer.scrollHeight}
      //    body.scrollTop=${body.scrollTop}
      //    body.clientHeight=${body.clientHeight}`
      // );
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
//訂變數 選定拿來算位置的對象
let main = document.getElementById("main");
let body = document.getElementById("body");
let bodyBottom = body.getBoundingClientRect().bottom;
let mainBottom = main.getBoundingClientRect().bottom;
// ---------------------------addEventListener
//監聽 scroll 事件，並利用 getBoundingClientRect() 計算元素和可視範圍的相對位置。
// element.addEventListener(event, function, useCapture)
// window.addEventListener("scroll", throttle());
window.addEventListener("scroll", debounce(loadMore, 10));
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

// function throttle() {
//   let lastMove = 0;
//   if (Date.now() - lastMove > 3) {
//     test();
//     lastMove = Date.now();
//   }
// }

// ---------------------------scroll triggers webContent if user at bottom
// element.scrollHeight - element.scrollTop === element.clientHeight
function loadMore() {
  // if (mainBottom < main.clientHeight + 104 + 55 + 10) {
  if (body.scrollHeight >= document.documentElement.clientHeight) {
    if (
      body.getBoundingClientRect().bottom ==
      document.documentElement.clientHeight
    ) {
      webContent();
    }
    // else {
    //   alert(`body.scrollHeight=${body.scrollHeight}
    //   body.scrollTop=${body.scrollTop}
    //   document.documentElement.clientHeight=${
    //     document.documentElement.clientHeight
    //   }
    //   body.getBoundingClientRect().bottom=${
    //     body.getBoundingClientRect().bottom
    //   }`);
    // }
  }
}

// alert(
//   `main.getBoundingClientRect().bottom=${main.getBoundingClientRect().bottom}
//    main.scrollHeight=${main.scrollHeight}
//    main.scrollTop=${main.scrollTop}
//    main.clientHeight=${main.clientHeight}`
// );

// alert(
//   `body.getBoundingClientRect().bottom=${main.getBoundingClientRect().bottom}
//    body.scrollHeight=${body.scrollHeight}
//    header.sH=${header.scrollHeight}
//    main.sH=${main.scrollHeight}
//    footer.sH=${footer.scrollHeight}
//    body.scrollTop=${body.scrollTop}
//    body.clientHeight=${body.clientHeight}`
// );

// alert(
//   `document.getBoundingClientRect().bottom=${
//     main.getBoundingClientRect().bottom
//   }
//    ddE.scrollHeight=${document.documentElement.scrollHeight}
//    ddE.scrollTop=${document.documentElement.scrollTop}
//    ddE.clientHeight=${document.documentElement.clientHeight}`
// );
