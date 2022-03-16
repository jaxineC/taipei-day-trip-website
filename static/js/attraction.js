// a literal expression, With strict mode, you can not use undeclared variables to write cleaner code.
"use strict";

// alert(window.location.href);
// alert(window.location.pathname);

let index = 0;
let imagesList;

function load() {
  let attractionId = window.location.pathname.replace("/attraction/", "");
  fetch(`/api/attraction/${attractionId}`, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((result) => {
      document.getElementById("image-0").src = result.data.images[0];
      document.getElementById("name").innerHTML = result.data.name;
      document.getElementById("category").innerHTML = result.data.category;
      document.getElementById("mrt").innerHTML = result.data.mrt;

      document.getElementById("description").innerHTML =
        result.data.description;
      document.getElementById("address").innerHTML = result.data.address;
      document.getElementById("transport").innerHTML = result.data.transport;
      let length = result.data.images.length;
      for (let i = 0; i < length; i++) {
        let newCircle = document.createElement("div");
        newCircle.className = "circle";
        newCircle.id = `circle-${i}`;
        document.getElementById("circles").appendChild(newCircle);
      }
      document.getElementById(`circle-${index}`).classList.add("current");
      return (imagesList = result.data.images);
    });
  // alert(imagesList);------------>undefined ?????????@@
}

function next() {
  let total = imagesList.length;
  // alert(`index=${index};total=${total}`);
  if (index === total - 1) {
    document.getElementById(`circle-${index}`).classList.remove("current");
    index = 0;
    document.getElementById("image-0").src = imagesList[index];
    document.getElementById(`circle-${index}`).classList.add("current");
  } else {
    document.getElementById("image-0").src = imagesList[index + 1];
    document.getElementById(`circle-${index}`).classList.remove("current");
    index++;
    document.getElementById(`circle-${index}`).classList.add("current");
    // index=+1;--------------->wrong ??????????????@@
    return index;
  }
}

function prev() {
  let total = imagesList.length;
  document.getElementById("images-0").src = imagesList[index - 1];
  document.getElementById(`circle-${index}`).classList.remove("current");
  index--;
  document.getElementById(`circle-${index}`).classList.add("current");
  return index;
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
