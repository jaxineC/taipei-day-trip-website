export async function fetchData(page, query) {
  let response = await fetch(`/api/attractions?page=${page + query}`, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  });
  let result = await response.json();
  return result;
}

export async function fetchOrder(url, method) {
  let response = await fetch("/api/booking", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  let result = await response.json();
  return result;
}
