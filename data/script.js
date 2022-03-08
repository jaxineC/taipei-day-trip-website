// a literal expression, With strict mode, you can not use undeclared variables to write cleaner code.
"use strict";

// alert("test");

let round = -1;
function webContent() {
  let keyword = document.getElementById("keyword");
  fetch(`http://52.20.252.232:3000/api/attractions?page=0`, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    // body: `{"page": 0,
    //         "keyword":${keyword}}`,
  })
    .then((res) => res.json())
    .then((result) => {
      // let txt = this.response();
      // let objectTxt = JSON.parse(txt);
      let objectTxt = this.JSON.parse();
      let round = 0;
      for (i = 0 + 8 * round; i < 8 + 8 * round; i++) {
        let divContainer = document.createElement("div"); //step1
        divContainer.id = "divContainer" + i;
        divContainer.className = "image";
        document.getElementById("mainContainer").appendChild(divContainer);

        // let images = document.createElement("img"); //step2
        // // let picUrl = "https"+src.result[i].results.file.split("https")[1];
        // let picUrl = objectTxt.data.images[0];
        // console.log(picUrl);
        // images.src = picUrl;

        // document.getElementById("divContainer" + i).appendChild(images);
        // let picTitle = document.createElement("div");
        // picTitle.className = "photo-name";
        // document.getElementById("divContainer" + i).appendChild(picTitle);
        // let srcTxt = objectTxt.result.results[i].stitle;
        // let picTitleTxt = document.createTextNode(srcTxt);
        // pTitle.appendChild(pTitleTxt);
      }
    });
}
