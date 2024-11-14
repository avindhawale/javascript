/*
Input
{
   "check_id":12345,
   "check_name":"Name of HTTP check",
   "check_type":"HTTP",
   "check_params":{
      "basic_auth":false,
      "params":[
        "size"
      ],
      "encryption": {
        "enabled": true,
      }
   }
}
Expected output
[
  "check_id",
  "check_name",
  "check_type",
  "check_params.basic_auth",
  "check_params.encryption.enabled"
]
*/

const chunks = ((array, n) => {
  let chunked = [];
  let temp = [];
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    //3
    if (count == n || i == array.length) {
      //true - count = 3
      chunked.push(temp); //chunked = [[1,4,12], [3,2,6]]
      temp = []; //temp[]
      count = 0; //count =0
    }
    temp.push(array[i]); //temp=[]
    count++; //count = 0
  }
  console.log(chunked);
  return chunked;
})([1, 4, 12, 3, 2, 6, -9, 0], 3);
