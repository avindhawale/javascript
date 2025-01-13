/* 
Input:
array = [4,1,7,9,3,44,76,11,39,55,8,34]

Output : [4, 34, 8, 76, 44, 3, 9, 11, 39, 55, 7, 1] //sequence does not matter
 */

function shiftEvenOddNumbers(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log("loop : ", i);
    if (arr[i] % 2 === 0) {
      let temp = arr[i];
      arr.splice(i, 1);
      arr.unshift(temp);
    }
  }

  return arr;
}

//Optimized solution
function siftEvenOdd(arr) {
  let left = 0; // Pointer for even numbers
  let right = arr.length - 1; // Pointer for odd numbers

  while (left < right) {
    console.log("loop : ");
    // If the left pointer is pointing to an even number and the right pointer is pointing to an odd number, swap them
    if (arr[left] % 2 !== 0 && arr[right] % 2 === 0) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
    // If the left pointer is pointing to an odd number, just move it to the right
    else if (arr[left] % 2 === 0) {
      left++;
    }
    // If the right pointer is pointing to an even number, just move it to the left
    else {
      right--;
    }
  }
  return arr;
}

//console.log(shiftEvenOddNumbers([4, 1, 7, 9, 3, 44, 76, 11, 39, 55, 8, 34]));
console.log(siftEvenOdd([4, 1, 7, 9, 3, 44, 76, 11, 39, 55, 8, 34]));
