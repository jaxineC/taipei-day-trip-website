export function renderPopupWidow(htmlContent) {
  let addNode = document.createElement("div");
  addNode.className = "popupContainer";
  addNode.id = "popupContainer";
  document.getElementById("body").appendChild(addNode);
  document.getElementById("popupContainer").innerHTML = htmlContent;
}

export function renderPopupMsg(error, msg) {
  if (error) {
    document.getElementById("popupMsg").innerHTML = `${msg}`;
  } else {
    document.getElementById("popupMsg").innerHTML = `${msg}`;
  }
}

export function popupClose() {
  document.getElementById("popupContainer").remove();
}
