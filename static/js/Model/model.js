export let test = function (x, y) {
  console.log(`x=${x}, y=${y}`);
};

export async function fetchData(page, query) {
  let response = await fetch(`/api/attractions?page=${page + query}`, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  });
  let result = await response.json();
  return result;
}
