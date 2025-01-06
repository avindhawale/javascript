//let parentheses = "([{}])";
//let parentheses = "()[]{}";
let parentheses = "((()))(()())(())()()(())()()()";
let stack = [];

function isValidParentheses(str) {
  if (str.length < 2) return false;
  if (str.length % 2 !== 0) return false;

  for (const char of str) {
    if (char === "(") stack.push(")");
    else if (char === "{") stack.push("}");
    else if (char === "[") stack.push("]");
    else if (stack.length === 0 || stack.pop() !== char) return false;
  }

  return stack.length === 0;
}

console.log(isValidParentheses(parentheses));
