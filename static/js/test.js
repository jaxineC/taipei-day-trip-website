import { getData, fetchData } from "./Model/model.js";

// let result = await getData("/api/booking", "GET");
// alert(result.data.attraction.id + " (result) from test.js");
let orderData = await getData("/api/booking", "GET");
document.getElementById("submitBtn").addEventListener("click", test);

async function test() {
  let bodyData = `{
    "order": "125"}`;
  let testData = await fetchData("/api/order", "POST", bodyData);
  return testData;
}

// async function test() {
//   let price = orderData.data.price;
//   let id = orderData.data.attraction.id;
//   let attractionName = orderData.data.attraction.name;
//   let address = orderData.data.attraction.address;
//   let attractionImg = orderData.data.attraction.image;
//   let date = orderData.data.date;
//   let time = orderData.data.time;
//   let name = document.getElementById("inputName").value;
//   let email = document.getElementById("inputEmail").value;
//   let phoneNumber = document.getElementById("inputNumber").value;
//   let bodyData = `{

//     "order": {
//       "price":"${price}",
//       "trip": {
//         "attraction": {
//           "id": "${id}",
//           "name": "${attractionName}",
//           "address": "${address}",
//           "image": "${attractionImg}"
//         },
//         "date": "${date}",
//         "time": "${time}"
//       },
//       "contact": {
//         "name": "${name}",
//         "email": "${email}",
//         "phone": "${phoneNumber}"
//       }
//     }
//   }`;
//   let testData = await fetchData("/api/order", "POST", bodyData);
//   return testData;
// fetch("api/order", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(bodyData),
// })
//   .then((response) => {
//     response.json();
//   })
//   .then((data) => {
//     console.log("Success:", data);
//     return data;
//   });
// }
