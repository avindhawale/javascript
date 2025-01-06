function getData(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
}

const url = "https://dummyjson.com/products";

getData(url).then((data) => {
  console.log(data);
  const sortedItems = data.products.sort((a, b) => b.price - a.price);
  console.log(sortedItems[1]);
});
