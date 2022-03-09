// a literal expression, With strict mode, you can not use undeclared variables to write cleaner code.
"use strict";

// alert("test");

let page = 0;
function webContent() {
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

        // if (result.data[i].images == null) {
        //   let noMore = document.createElement("div");
        //   noMore.appendChild("No More Result");
        //   break;
        // } else {
        // }

        let attractions = document.createElement("div"); //step1
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
