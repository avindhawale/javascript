const arrangeCoins = function (n) {
  let count = 0;
  while (count < n) {
    count++;
    console.log(count);
    n -= count;
  }
  return count;
};

console.log(arrangeCoins(8));
console.log(arrangeCoins(10));
