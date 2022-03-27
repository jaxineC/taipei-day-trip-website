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
