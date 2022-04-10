import { getData, fetchData } from "./Model/model.js";

let orderData = await getData("/api/booking", "GET");

// 0. declare variables
const APP_ID = "124002";
const APP_KEY =
  "app_rM4YckS3zBqhpj5uAXJPDf6qq2w52ZOILKfq79vz44gU5dGD7ehGk5K8xaWj";

let fields = {
  number: {
    element: "#card-number",
    placeholder: "**** **** **** ****",
  },
  expirationDate: {
    element: document.getElementById("card-expiration-date"),
    placeholder: "MM / YY",
  },
  ccv: {
    element: "#card-ccv",
    placeholder: "CCV",
  },
};
const submitButton = document.querySelector("#submitBtn");

// 2. 利用 TPDirect.setupSDK 設定參數 (初始化使用TPDirect)
TPDirect.setupSDK(APP_ID, APP_KEY, "sandbox");

// 3. 使用 TPDirect.card.setup 設定外觀 (載入表單)
// TPDirect.card.setup(config);
TPDirect.card.setup({
  fields: fields,
  styles: {
    ":focus": {
      color: "black",
    },
    ".valid": {
      color: "gray",
      // color: "#51B727",
    },
    ".invalid": {
      color: "gray",
    },
  },
});

function setToError(className) {
  let parent = document.querySelector(className);
  parent.querySelector(".ok").style.display = "none";
  parent.querySelector(".error").style.display = "inline-block";
  parent.querySelector(".entering").style.display = "none";
}

function setToSuccess(className) {
  let parent = document.querySelector(className);
  parent.querySelector(".ok").style.display = "inline-block";
  parent.querySelector(".error").style.display = "none";
  parent.querySelector(".entering").style.display = "none";
}

function setToNormal(className) {
  let parent = document.querySelector(className);
  parent.querySelector(".ok").style.display = "none";
  parent.querySelector(".error").style.display = "none";
  parent.querySelector(".entering").style.display = "none";
}

function setToEntering(className) {
  let parent = document.querySelector(className);
  parent.querySelector(".ok").style.display = "none";
  parent.querySelector(".error").style.display = "none";
  parent.querySelector(".entering").style.display = "inline-block";
}

// 4. TPDirect.card.onUpdated 取得 TapPay Fields 狀態 (監聽表單輸入狀態)
TPDirect.card.onUpdate(function (update) {
  // update.canGetPrime === true
  // --> you can call TPDirect.card.getPrime()
  if (update.canGetPrime) {
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.setAttribute("disabled", true);
  }

  // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unknown']
  if (update.cardType === "visa") {
    // Handle card type visa.
  }
  //   0	欄位已填好，並且沒有問題
  //   1	欄位還沒有填寫
  //   2	欄位有錯誤，此時在 CardView 裡面會用顯示 errorColor
  //   3	使用者正在輸入中
  if (update.status.number === 2) {
    setToError(".card-number");
  } else if (update.status.number === 0) {
    setToSuccess(".card-number");
  } else if (update.status.number === 3) {
    setToEntering(".card-number");
  } else {
    setToNormal(".card-number");
  }

  if (update.status.expiry === 2) {
    setToError(".card-expiration-date");
  } else if (update.status.expiry === 0) {
    setToSuccess(".card-expiration-date");
  } else if (update.status.expiry === 3) {
    setToEntering(".card-expiration-date");
  } else {
    setToNormal(".card-expiration-date");
  }

  if (update.status.ccv === 2) {
    setToError(".card-ccv");
  } else if (update.status.ccv === 0) {
    setToSuccess(".card-ccv");
  } else if (update.status.ccv === 3) {
    setToEntering(".card-ccv");
  } else {
    setToNormal(".card-ccv");
  }
});

// 5. 利用 TPDirect.card.getPrime 來取得 prime 字串
// call TPDirect.card.getPrime when user submit form to get tappay prime
// $('form').on('submit', onSubmit)

function onSubmit(event) {
  event.preventDefault();
  // 取得 TapPay Fields 的 status
  const tappayStatus = TPDirect.card.getTappayFieldsStatus();

  // 確認是否可以 getPrime
  if (tappayStatus.canGetPrime === false) {
    alert("can not get prime");
    return;
  }
  // Get prime
  TPDirect.card.getPrime((result) => {
    if (result.status !== 0) {
      alert("get prime error " + result.msg);
      return;
    }
    alert("get prime 成功，prime: " + result.card.prime);

    // send prime to your server, to pay with Pay by Prime API .
    // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
    let price = orderData.data.price;
    let id = orderData.data.attraction.id;
    let attractionName = orderData.data.attraction.name;
    let address = orderData.data.attraction.address;
    let attractionImg = orderData.data.attraction.image;
    let date = orderData.data.date;
    let time = orderData.data.time;
    let name = document.getElementById("inputName").value;
    let email = document.getElementById("inputEmail").value;
    let phoneNumber = document.getElementById("inputNumber").value;
    let bodyData = `{
      "prime": "${result.card.prime}",
      "order": {
        "price":"${price}",
        "trip": {
          "attraction": {
            "id": "${id}",
            "name": "${attractionName}",
            "address": "${address}",
            "image": "${attractionImg}"
          },
          "date": "${date}",
          "time": "${time}"
        },
        "contact": {
          "name": "${name}",
          "email": "${email}",
          "phone": "${phoneNumber}"
        }
      }
    }`;
    // let data = await fetchData("/api/order", "POST", bodyData);
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.data.payment.status);
        if (data.data.payment.status == 0) {
          window.location.href = `/thankyou?number=${data.data.number}`;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

document.getElementById("submitBtn").addEventListener("click", onSubmit);
