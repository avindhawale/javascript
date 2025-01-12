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

const obj = {
  check_id: 12345,
  check_name: "Name of HTTP check",
  check_type: "HTTP",
  check_params: {
    basic_auth: false,
    params: ["size"],
    encryption: {
      enabled: true,
    },
  },
};

let result = [];
function flattenKeys(obj, parent = "") {
  for (let key in obj) {
    // Create the new key by appending to the parent (dot notation)
    const newKey = parent ? `${parent}.${key}` : key;
    // If the value is an object, recursively call flattenKeys
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      result.concat(flattenKeys(obj[key], newKey));
    } else {
      // If it's a primitive value or an array, add it to the result
      result.push(newKey);
    }
  }

  return result;
}

console.log(flattenKeys(obj));
