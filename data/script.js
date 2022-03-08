// a literal expression, With strict mode, you can not use undeclared variables to write cleaner code.
"use strict";

let round = -1;
function webContent() {
  let keyword = document.getElementById("keyword")
  fetch(`http://52.20.252.232:3000/api/attractions`,{
    method:"GET",
    mode:"cors",
    headers:{ "Content-Type": "application/json" },
    body: `{"page": 0, 
            "keyword":${keyword}}`
  }).then(
    (res) => res.json()
  ).then(
    (result) => {
      let txt = this.response();
      let objectTxt = JSON.parse(txt);
      let round = 0
      for (i = 0 + 8 * round; i < 8 + 8 * round; i++) {
        let divContainer = document.createElement("div"); //step1
        divContainer.id = "divContainer" + i;
        divContainer.className = "image";
        document
          .getElementById("articleContainer")
          .app            endChild(divContainer);
  
        let images = document.createElement("img"); //step2
        // let picUrl = "https"+src.result[i].results.file.split("https")[1];
        let picUrlList = objectTxt.result.results[i].file.split("https://");
        let picUrl = picUrlList[1];
        console.log(picUrl);
        images.src = "https://" + picUrl;
        document.getElementById("divContainer" + i).appendChild(images);
        let pTitle = document.createElement("div");
        pTitle.className = "photo-name";
        document.getElementById("divContainer" + i).appendChild(pTitle);
        let srcTxt = objectTxt.result.results[i].stitle;
        let pTitleTxt = document.createTextNode(srcTxt);
        pTitle.appendChild(pTitleTxt);
    }
  );