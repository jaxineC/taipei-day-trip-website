// a literal expression, With strict mode, you can not use undeclared variables to write cleaner code.
"use strict";

// alert(window.location.href);
// alert(window.location.pathname);

function load() {
  let attractionId = window.location.pathname.replace("/attraction/", "");
  fetch(`/api/attraction/${attractionId}`, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((result) => {
      document.getElementById("images").src = result.data.images[0];
      document.getElementById("name").innerHTML = result.data.name;
      document.getElementById("category").innerHTML = result.data.category;
      document.getElementById("mrt").innerHTML = result.data.mrt;

      document.getElementById("description").innerHTML =
        result.data.description;
      document.getElementById("address").innerHTML = result.data.address;
      document.getElementById("transport").innerHTML = result.data.transport;

      // result.data.images;
    });
}

function change(index) {
  document.getElementById("images").innerHTML = result.data.images[index];
}

function toggle(event) {
  let x = event.target;
  if (x.id === "dotMorning") {
    document.getElementById("price").innerHTML = "2000";
    document.getElementById("dotMorning").style.background = "#448899";
    document.getElementById("dotAfternoon").style.background = "white";
  } else {
    document.getElementById("price").innerHTML = "2500";
    document.getElementById("dotMorning").style.background = "white";
    document.getElementById("dotAfternoon").style.background = "#448899";
  }
}
