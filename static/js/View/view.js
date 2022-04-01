export function renderNoMore() {
  let noMore = document.createElement("div");
  noMore.id = "noMore";
  noMore.className = "noMore";
  document.getElementById("mainContainer").appendChild(noMore);
  let nMoreNode = document.createTextNode("沒有再多景點要載入了");
  noMore.appendChild(nMoreNode);
}

export function clearContent() {
  let searchResult = document.createElement("div");
  searchResult.id = "mainContainer";
  searchResult.className = "mainContainer";
  document.getElementById("mainContainer").innerHTML = null;
}
