function foo(option) {
  const result = option || "Hello";
  return result;
}

console.log(foo());
console.log(foo(31337));
