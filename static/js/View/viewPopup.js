export function renderPopupWindow(htmlContent) {
  let addNode = document.createElement("div");
  addNode.className = "popupContainer";
  addNode.id = "popupContainer";
  document.getElementById("body").appendChild(addNode);
  let modal = document.getElementById("popupContainer");
  document.getElementById("popupContainer").innerHTML = htmlContent;

  document.addEventListener("keydown", function (eventObj) {
    if (eventObj.key === "Escape" && modal != null) {
      // if (eventObj.key === "Escape" && !modal.className.contains('hidden')) {
      popupClose();
    }
  });
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
