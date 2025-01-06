let tempData;
function getData() {
  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      let prices = [];
      prices = data.map((item) => item.price);
      console.log(prices);
    });
}

getData();
