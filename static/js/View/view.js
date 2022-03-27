export function clearContent() {
  let searchResult = document.createElement("div");
  searchResult.id = "mainContainer";
  searchResult.className = "mainContainer";
  document.getElementById("mainContainer").innerHTML = null;
}
