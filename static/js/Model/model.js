export async function getData(url, method) {
  let response = await fetch(url, {
    method: method,
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  });
  let result = await response.json();
  return result;
}

export async function fetchData(url, method, bodyData) {
  let response = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });
  let result = await response.json();
  return result;
}
