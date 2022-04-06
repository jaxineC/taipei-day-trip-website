//common -------------------------------------------------------------------------------------------------------

//index page -------------------------------------------------------------------------------------------------------
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

//attraction page-------------------------------------------------------------------------------------------------------

//booking page-------------------------------------------------------------------------------------------------------
export function loadOrder(result, status) {
  let date = new Date(result.data.date);
  let [YYYY, MM, DD] = [
    date.getFullYear(),
    date.getMonth().toString().padStart(2, "0"),
    date.getDate().toString().padStart(2, "0"),
  ];
  document.getElementById(
    "attractionImg"
  ).src = `${result.data.attraction.image}`;
  document.getElementById(
    "attractionName"
  ).innerHTML = `${result.data.attraction.name}`;
  document.getElementById("time").innerHTML = `${result.data.time}`;
  document.getElementById("price").innerHTML = `${result.data.price}`;
  document.getElementById("date").innerHTML = `${YYYY}-${MM}-${DD}`;
  document.getElementById(
    "address"
  ).innerHTML = `${result.data.attraction.address}`;
  document.getElementById("inputName").value = `${status.data.name}`;
  document.getElementById("inputEmail").value = `${status.data.email}`;
}

export function renderNoOrder() {
  document.getElementById("bookingContainer").innerHTML =
    "目前沒有任何待預訂的行程";
  let footerHeight = window.innerHeight - 215;
  document.getElementById("footer").style.height = `${footerHeight}px`;
  document.getElementById("footer").style.alignItems = "normal";
  document.getElementById("mainContainer").style.margin = "37px 0px 40px 0px";
}
