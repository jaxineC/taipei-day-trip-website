// a literal expression, With strict mode, you can not use undeclared variables to write cleaner code.
"use strict";

// alert("test");

let page = -1;

function webContent() {
  let keyword = document.getElementById("keyword");
  // fetch("http://52.20.252.232:3000/api/attractions", {
  fetch("http://192.168.0.69:3000/api/attractions", {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    // body: `{"page": 0,
    //         "keyword":${keyword}}`,
  })
    .then((response) => response.json())
    .then((result) => {
      // let txt = res.json();
      // let objectTxt = JSON.parse(txt);
      // data.JSON.parse();
      let page = 0;
      for (let i = 0 + 8 * page; i < 8 + 8 * page; i++) {
        //appendchild 8 containers "attractions" uder mainContainer
        let attractions = document.createElement("div"); //step1
        attractions.id = "attraction-" + i;
        attractions.className = "attractions";
        document.getElementById("mainContainer").appendChild(attractions);

        //appendchild 8 containers "attractions" uder mainContainer
        let images = document.createElement("img");
        let url = result.data[i].images[0];
        images.src = url;
        images.id = "attractionImage-" + i;
        images.className = "attractionImage";
        document.getElementById("attraction-" + i).appendChild(images);

        let names = document.createElement("div");
        names.id = "attractionName-" + i;
        names.className = "attractionName Bold";
        document.getElementById("attraction-" + i).appendChild(names);
        let namesNode = document.createTextNode(result.data[i].name);
        names.appendChild(namesNode);

        let mrts = document.createElement("div");
        mrts.id = "attractionMrt-" + i;
        mrts.className = "attractionMrt";
        document.getElementById("attraction-" + i).appendChild(mrts);
        let mrtNode = document.createTextNode(result.data[i].mrt);
        mrts.appendChild(mrtNode);

        let cats = document.createElement("div");
        cats.id = "attractionCat-" + i;
        cats.className = "attractionCat";
        document.getElementById("attraction-" + i).appendChild(cats);
        let catNode = document.createTextNode(result.data[i].category);
        cats.appendChild(catNode);
      }
    });
}
